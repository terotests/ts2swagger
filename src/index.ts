
  
import Project, { JSDocTag, MethodDeclaration, ClassDeclaration, SourceFile, InterfaceDeclaration, ParameterDeclaration, FunctionDeclaration, PropertyDeclaration } from "ts-simple-ast";
import * as R from 'robowr'
import * as ProgrammerBase from './programmer/service'
import {
  getFunctionDoc, 
  JSDocParams, 
  getClassDoc, 
  isBoolean, 
  getTypePath,
  IFTypeDefinition,
  toSwaggerType,
  isSimpleType,
  getMethodDoc} from './utils'
import { Interface } from "mocha";
import * as utils from './utils'
import _ from 'lodash'
import * as ts from "typescript";
import {createProject} from './firstVersion'

const path = require('path')

// code transpiler callbacks
export interface GenerationOptions {
  path: string
  isServiceClass: (ctx:InterfaceState) => boolean;
  initSwaggerForService: (ctx:InterfaceState) => any;
} 

export interface InterfaceState {

  wr?: R.CodeWriter

  // TODO: type declare the swagger documentation
  swagger?: any    

  // This could be the context of the writer...
  currentProject?: Project
  currentSourceFile?: SourceFile
  
  currentClass?: {
    JSDoc?: JSDocParams,
    declaration? : ClassDeclaration 
  }
  currentMethod?: {
    JSDoc?: JSDocParams,
    declaration?: MethodDeclaration, 
  }
  currentFunction?: {
    JSDoc?: JSDocParams,
    declaration?: MethodDeclaration, 
  }  

  // parameters given for this endpoint
  pathParams?: ParameterDeclaration[]
  queryParams?: ParameterDeclaration[]
  bodyParams?: ParameterDeclaration[] 

  paramTypes?: IFTypeDefinition[]
  returnType?: IFTypeDefinition
  isReturnTypeModel?: boolean

  is_post?:boolean
  httpMethod?:string
  apiPath?:string
  pathParamStr?:string
  clone? : ( args?:InterfaceState) => InterfaceState;
}

export class CInterfaceState {
  
  wr?: R.CodeWriter

  // TODO: type declare the swagger documentation
  swagger?: any    

  // This could be the context of the writer...
  currentProject?: Project
  currentSourceFile?: SourceFile
  
  currentClass?: {
    JSDoc?: JSDocParams,
    declaration? : ClassDeclaration 
  }
  currentMethod?: {
    JSDoc?: JSDocParams,
    declaration?: MethodDeclaration, 
  }
  currentFunction?: {
    JSDoc?: JSDocParams,
    declaration?: MethodDeclaration, 
  }  

  // parameters given for this endpoint
  pathParams?: ParameterDeclaration[]
  queryParams?: ParameterDeclaration[]
  bodyParams?: ParameterDeclaration[] 

  paramTypes?: IFTypeDefinition[]
  returnType?: IFTypeDefinition
  isReturnTypeModel?: boolean

  is_post?:boolean
  httpMethod?:string
  apiPath?:string
  pathParamStr?:string

  constructor() {
    this.currentClass = {}
    this.currentMethod = {}
    this.currentFunction = {}
    this.paramTypes = []
  }

  clone( args?:InterfaceState) : InterfaceState {
    return Object.assign(Object.create(this), this, args)
  }
}

export const isServiceClass = (ctx:InterfaceState) => ctx.currentClass.JSDoc.hasTag('service');
export const initSwaggerForService = (ctx:InterfaceState) => {
  const service = ctx.currentClass.JSDoc
  return {  
    "swagger": "2.0",
    "basePath": service.getTag('endpoint') || '/v1/', 
    "paths" : {

    },
    "definitions" : {

    },
    "schemes":["http", "https"],
    "info": {
      "version": service.getTag('version'),
      "title": service.getTag('title') || '',
      "description": service.getTag('description') || '',      
      "termsOfService": service.getTag('tos') || '',
    },
    tags : []  
  }
}

export const isModelClass = (ctx:InterfaceState) : boolean => {
  return getClassDoc( ctx.currentClass.declaration ).hasTag('model')
}

export type InterfaceOrClass = ClassDeclaration | InterfaceDeclaration

export const findModel = ( ctx:InterfaceState, className:string ) : InterfaceOrClass => {
  let res:InterfaceOrClass = null
  ctx.currentProject.getSourceFiles().forEach( s => {
    s.getClasses().forEach( cl => {
      ctx.clone({currentClass:{
          declaration:cl
        }})
      if( cl.getName() === className ) {
        const info = getClassDoc( cl )
        if(info.tags.model) {
          res = cl
        }            
      }
    })
    s.getInterfaces().forEach( cl => {
      if( cl.getName() === className ) {
        const info = getClassDoc( cl )
        if(info.tags.model) {
          res = cl
        }            
      }
    })
  })  
  return res
}

export const CollectEndpointParams = ( ctx:InterfaceState ) : InterfaceState => {

  // wr:R.CodeWriter, project:Project, clName:ClassDeclaration, method:MethodDeclaration
  const wr = ctx.wr 
  const result = ctx.clone({
    paramTypes : []
  })

  // basic
  const methodInfo = ctx.currentMethod.JSDoc
  const method = ctx.currentMethod.declaration

  if(ctx.currentMethod.JSDoc.hasTag('nogenerate')) return result;  

  // the URL path for this method...
  let methodName = method.getName()
  const methodAlias = methodInfo.tags.alias || methodName

  const basePath = ctx.currentClass.JSDoc.getTag('endpoint')

  const pathParams:ParameterDeclaration[] = []
  const queryParams:ParameterDeclaration[] = []
  const bodyParams:ParameterDeclaration[] = []

  const path = methodAlias.split('/'); // for example "users/documents"
  const methodParams = method.getParameters()

  for( let i=0; i < path.length; i++) {
    if( methodParams[i] && !(methodParams[i].getName() === methodInfo.tags.query) && isSimpleType( methodParams[i].getType() ) ) {
      // only ID types here
      pathParams.push( methodParams[i] )
    } else {
      break; // no more
    }
  }

  // collect query parameters after the path parameters
  for( let i=pathParams.length; i < methodParams.length; i++) {
    if( isSimpleType( methodParams[i].getType() ) ) {
      // only ID types here
      queryParams.push( methodParams[i] )
    } else {
      break; // no more
    }
  }

  // collect post parameters after the path parameters
  for( let i=(pathParams.length + queryParams.length) ; i < methodParams.length; i++) {
    bodyParams.push( methodParams[i] )
    const paramDef = toSwaggerType(methodParams[i].getType())
    const model = findModel( ctx, paramDef.lastType )
    if(model !== null) {
      result.paramTypes.push( paramDef )
    }
  }  

  result.queryParams = queryParams
  result.pathParams = pathParams
  result.bodyParams = bodyParams
  result.returnType = toSwaggerType(method.getReturnType())

  result.isReturnTypeModel = findModel( ctx, result.returnType.lastType ) !== null;

  result.is_post =  bodyParams.length > 0 
  result.httpMethod = methodInfo.tags.method || ( result.is_post ? 'post' : 'get' );
  result.pathParamStr =  pathParams.map( param=> {
    return ':' + param.getName();
  }).join('/')
  
  // Collects all tags from the method
  const addTag = (tagname:string, description:string) => {
    const swagger = wr.getState().swagger;
    if( swagger.tags.filter( t => t.name === tagname).length === 0 ) {
      swagger.tags.push({name:tagname, description})
    }
  }
  const addTagDescription = (tagname:string, description?:string) => {
    const swagger = wr.getState().swagger;
    const tag = swagger.tags.filter( t => t.name === tagname).pop();
    if(tag && description) {
      tag.description = description;
    }
  };  

  const taglist = [];
  if( methodInfo.tags.tag ) {
    taglist.push( methodInfo.tags.tag );
    addTag( methodInfo.tags.tag, '' )
    addTagDescription( methodInfo.tags.tag, methodInfo.tags.tagdescription )
  }


  // build the path for api path
  let apiPath = ''
  path.forEach( (pathPart,i)=>{
    apiPath += pathPart + '/'
    if( pathParams[i] ) {
      apiPath += ':' + pathParams[i].getName() +'/';
    }
  });
  result.apiPath = apiPath
  return result;
}


/*
export const WriteEndpoint = ( ctx:InterfaceState ) : R.CodeWriter => {

  // wr:R.CodeWriter, project:Project, clName:ClassDeclaration, method:MethodDeclaration
  const wr = ctx.wr 

  const methodInfo = getMethodDoc(method)
  if(methodInfo.tags.nogenerate) return wr  

  let methodName = method.getName()
  const methodAlias = methodInfo.tags.alias || methodName

  const basePath = wr.getState().swagger.basePath
  const pathParams = []
  const queryParams = []
  const bodyParams = []

  const path = methodAlias.split('/'); // for example "users/documents"

  const methodParams = method.getParameters()

  // TODO: create setting for making params in the query
  // methodInfo.tags.queryparams
  for( let i=0; i < path.length; i++) {
    if( methodParams[i] && !(methodParams[i].getName() === methodInfo.tags.query) && isSimpleType( methodParams[i].getType() ) ) {
      // only ID types here
      pathParams.push( methodParams[i] )
    } else {
      break; // no more
    }
  }

  // collect query parameters after the path parameters
  for( let i=pathParams.length; i < methodParams.length; i++) {
    if( isSimpleType( methodParams[i].getType() ) ) {
      // only ID types here
      queryParams.push( methodParams[i] )
    } else {
      break; // no more
    }
  }

  // collect post parameters after the path parameters
  for( let i=(pathParams.length + queryParams.length) ; i < methodParams.length; i++) {
    bodyParams.push( methodParams[i] )
  }  

  const is_post = bodyParams.length > 0 
  let httpMethod = methodInfo.tags.method || ( is_post ? 'post' : 'get' );

  const pathParamStr = pathParams.map( param=> {
    return ':' + param.getName();
  }).join('/')

  const addTag = (tagname:string, description:string) => {
    const swagger = wr.getState().swagger;
    if( swagger.tags.filter( t => t.name === tagname).length === 0 ) {
      swagger.tags.push({name:tagname, description})
    }
  }
  const addTagDescription = (tagname:string, description?:string) => {
    const swagger = wr.getState().swagger;
    const tag = swagger.tags.filter( t => t.name === tagname).pop();
    if(tag && description) {
      tag.description = description;
    }
  };  

  // build the path for api path
  let apiPath = ''
  path.forEach( (pathPart,i)=>{
    apiPath += pathPart + '/'
    if( pathParams[i] ) {
      apiPath += ':' + pathParams[i].getName() +'/';
    }
  })

  wr.out(`// Service endpoint for ${methodName}`, true);
  wr.out(`app.${httpMethod}('${basePath}${apiPath}', async function( req, res ) {` , true)
  wr.indent(1)

  wr.out('try {', true)
  wr.indent(1)
    const pathArgs = pathParams.map( param => 'req.params.'+ param.getName() );
    const queryArgs = queryParams.map( param => {
      const pname = 'req.query.'+ param.getName()
      if(getTypeName( param.getType() ) === 'boolean') {
        return `typeof(${pname}) === 'undefined' ? ${pname} : ${pname} === 'true'`
      }
      return 'req.query.'+ param.getName() 
    } );
    const postArgs = bodyParams.length > 0 ? ['req.body'] : []
    const paramList = [...pathArgs ,...queryArgs, ...postArgs].join(', ')
    // name of the server
    const servername = methodInfo.tags['using'] || 'server'; 
    wr.out(`res.json( await ${servername}.${methodName}(${paramList}) );`, true)
  wr.indent(-1)
  wr.out('} catch(e) {', true)
    wr.indent(1)
    wr.out('res.status(400);', true)
    wr.out(`res.json( e.message );`, true)
    wr.indent(-1)
  wr.out('}', true)
  wr.indent(-1)
  wr.out(`})`, true)
  
  const rArr = getTypePath( method.getReturnType() )
  const is_array = rArr[0] === 'Array'
  const rType = rArr.pop()  
  const successResponse = {}
  const definitions = {}

  const createClassDef = (className:string) => {
    const modelClass = utils.findModel(project, className);     

    // TODO: find out how to fix this in TypeScript, this if and the if below repeat
    // code too much...
    if( modelClass instanceof ClassDeclaration && !definitions[modelClass.getName()]) {
      const props = modelClass.getProperties()
      definitions[modelClass.getName()] = {
        type : 'object',
        properties : {
          ...props.reduce( (prev, curr) => {
            const rArr = getTypePath( curr.getType() )
            const is_array = rArr[0] === 'Array'
            const rType = rArr.pop()            
            const swType = getSwaggerType( rType, is_array )
            createClassDef( rType )
            return { ...prev,
              [curr.getName()] : {
                ...swType
              }
            }
          },{})
        }
      }              
    } 
    if(modelClass instanceof InterfaceDeclaration && !definitions[modelClass.getName()]) {
      const props = modelClass.getProperties()
      definitions[modelClass.getName()] = {
        type : 'object',
        properties : {
          ...props.reduce( (prev, curr) => {
            const rArr = getTypePath( curr.getType() )
            const is_array = rArr[0] === 'Array'
            const rType = rArr.pop()            
            const swType = getSwaggerType( rType, is_array )
            createClassDef( rType )
            return { ...prev,
              [curr.getName()] : {
                ...swType
              }
            }
          },{})
        }
      }              
    }     
  }

  successResponse['200'] = {
    description : '',
    schema : {
      ...getSwaggerType( rType, is_array )
    }
  }  
  createClassDef(rType) 
  // generate swagger docs of this endpoin, a simple version so far
  const state = wr.getState().swagger
  const validParams = method.getParameters(); 
  
  // build the path for swagger
  let swaggerPath = ''
  path.forEach( (pathPart,i)=>{
    swaggerPath += '/' + pathPart
    if( pathParams[i] ) {
      swaggerPath += '/{' + pathParams[i].getName() + '}';
    }
  })
  
  // the old simple mapping...
  // const axiosGetVars = getParams.map( param => ('{' + param.getName() + '}' ) ).join('/')

  const taglist = [];
  if( methodInfo.tags.tag ) {
    taglist.push( methodInfo.tags.tag );
    addTag( methodInfo.tags.tag, '' )
    addTagDescription( methodInfo.tags.tag, methodInfo.tags.tagdescription )
  }
  // NOTE: in Swagger parameter types are
  // -path
  // -query
  // -header (not implemented)
  // -cookie (not implemented)
  const previous = state.paths[swaggerPath]
  state.paths[swaggerPath] = {
    ...previous,
    [httpMethod]: {
      "parameters" : [
        ...pathParams.map( (param) => {
          return {
            name : param.getName(),
            in : "path",
            description :  methodInfo.tags[param.getName()] || '',
            required : true,
            type : getTypeName( param.getType() )
          }          
        }),
        ...queryParams.map( (param) => {
          return {
            name : param.getName(),
            in : "query",
            description :  methodInfo.tags[param.getName()] || '',
            required : !param.isOptional(),
            type : getTypeName( param.getType() )
          }          
        }),        
        ...bodyParams.map( (param) => {
          const rArr = getTypePath( param.getType() )
          const is_array = rArr[0] === 'Array'
          const rType = rArr.pop()  
          let tDef:any = {
            schema : {
              ...getSwaggerType( rType, is_array) 
            }
          }
          if( isSimpleType( param.getType()) ) {
            tDef = {
              type : rType
            }
          } else {
            createClassDef(rType)
          }                  
          return {
            name : param.getName(),
            in : "body",
            description : methodInfo.tags[param.getName()] || '',
            required : !param.isOptional(),
            ...tDef
          }
        })
      ],
      "description": methodInfo.tags.description || methodInfo.comment,
      "summary": methodInfo.tags.summary || methodInfo.tags.description || methodInfo.comment,
      "produces": [
        "application/json"
      ],
      "responses": {
        ...successResponse,
      },
      "tags" : taglist
    }
  }  
  state.definitions = Object.assign( state.definitions, definitions )
  return wr;
}
*/

/*
project:Project, clName:ClassDeclaration, method:MethodDeclaration 
*/
export async function createProject( settings:GenerationOptions) {
  const project = new Project();

  project.addExistingSourceFiles([`${settings.path}/**/*.ts`]); // , "!**/*.d.ts"
  const RFs = new R.CodeFileSystem()

  // create one dummy file writer for setting the context for the services
  const baseWriter = RFs.getFile('/', 'index.ts').getWriter()

  const ctx = new CInterfaceState()
  ctx.currentProject = project;

  // continuer with this...
  baseWriter.setState(ctx)
  ctx.wr = baseWriter
  
  // map services to state
  const services = baseWriter.getState().services = {}

  // mapeservice classes to the properties
  project.getSourceFiles().forEach( sourceFile => {
    ctx.currentSourceFile = sourceFile
    sourceFile.getClasses().forEach( c=>{
      ctx.currentClass.declaration = c
      ctx.currentClass.JSDoc = getClassDoc( c )
      if(settings.isServiceClass( ctx )) {

        baseWriter.getState().swagger = settings.initSwaggerForService(ctx);
        const injectWriter = new R.CodeWriter();      

        c.getMethods().forEach( m => {
          ctx.currentMethod = {
            declaration : m,
            JSDoc: getMethodDoc(m)
          }
          const endpoint = CollectEndpointParams(ctx);
          console.log(m.getName(), '=>', endpoint.apiPath, ' param types len ', endpoint.paramTypes.length)
          if( endpoint.isReturnTypeModel ) {
            console.log('^ returns model ', endpoint.returnType.lastType)
          }
          ProgrammerBase.WriteEndpoint( injectWriter, project, c, m )
          // if(clientWriter) ProgrammerBase.WriteClientEndpoint( clientWriter, project, c, m )
        })  
        // search project for possible endpoints where to write this...
        project.getSourceFiles().forEach( s => {
          s.getFunctions().forEach( f => {
            const info = getFunctionDoc(f)
            // console.log(f.getName(), info)
            if(info.tags.service === ctx.currentClass.JSDoc.getTag('service') ) {
              f.setBodyText(writer => {
                writer.setIndentationLevel('  ').write(injectWriter.getCode())
              }) 
            }
          })
        })
        // create swagger file
        const swaggerPath:any = ctx.currentClass.JSDoc.getTag('swagger');
        if( swaggerPath ) {
          const swagger = RFs.getFile(path.dirname(swaggerPath), path.basename(swaggerPath)).getWriter()
          swagger.raw( JSON.stringify( swagger.getState().swagger, null, 2 ) )        
        }
      } 
    })  
    sourceFile.getClasses().forEach( c=>{
      if( services[c.getName()] ) {
        const serviceinfo:any = services[c.getName()]
        ProgrammerBase.initSwagger( baseWriter, serviceinfo )
        const injectWriter = new R.CodeWriter();      
        c.getMethods().forEach( m => {
          ProgrammerBase.WriteEndpoint( injectWriter, project, c, m )
          // if(clientWriter) ProgrammerBase.WriteClientEndpoint( clientWriter, project, c, m )
        })  
        // inject declaration to some function...
        project.getSourceFiles().forEach( s => {
          s.getFunctions().forEach( f => {
            const info = getFunctionDoc(f)
            // console.log(f.getName(), info)
            if(info.tags.service === serviceinfo.service ) {
              f.setBodyText(writer => {
                writer.setIndentationLevel('  ').write(injectWriter.getCode())
              }) 
            }
          })
        })
        // create swagger file
        const swaggerPath:any = serviceinfo.swagger;
        if( swaggerPath ) {
          const swagger = RFs.getFile(path.dirname(swaggerPath), path.basename(swaggerPath)).getWriter()
          swagger.raw( JSON.stringify( swagger.getState().swagger, null, 2 ) )        
        }
      }
    })        
  })  
  await RFs.saveTo('./', false );
  await project.save()  
  console.log('Project saved')
}
