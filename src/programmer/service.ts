import * as R from 'robowr'
import { MethodDeclaration, ClassDeclaration, Project } from 'ts-simple-ast'
import * as utils from '../utils'

const getTypeName = utils.getTypeName
const isSimpleType = utils.isSimpleType
const getTypePath = utils.getTypePath
const getSwaggerType = utils.getSwaggerType
const getMethodDoc = utils.getMethodDoc

export const initSwagger = (wr:R.CodeWriter, service:any) : R.CodeWriter => {
  const base = {  
    "swagger": "2.0",
    "basePath": service.endpoint || '/v1/', 
    "paths" : {

    },
    "definitions" : {

    },
    "schemes":["http", "https"],
    "info": {
      "version": service.version,
      "title": service.title || '',
      "description": service.description || '',      
      "termsOfService": service.tos || '',
    },
    tags : []  
  }; 
  wr.getState().swagger = base
  return wr
}

export const WriteEndpoint = (wr:R.CodeWriter, project:Project, clName:ClassDeclaration, method:MethodDeclaration ) : R.CodeWriter => {
  const methodInfo = getMethodDoc(method)
  if(methodInfo.tags.nogenerate) return wr  
  let methodName = method.getName()
  const getParams = method.getParameters().filter( param => isSimpleType(param.getType()) )
  const postParams = method.getParameters().filter( param => !isSimpleType(param.getType()) )
  const is_post = method.getParameters().filter( project => !isSimpleType(project.getType()) ).length > 0
  let httpMethod = is_post ? 'post' : 'get';
  const getParamStr = getParams.map( param=> {
    return ':' + param.getName();
  }).join('/')

  const getMethodAlias = () : string => {
    return methodInfo.tags.alias || methodName
  } 
  const getHTTPMethod = () : string => {
    return methodInfo.tags.method || httpMethod
  } 
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
  wr.out(`// Service endpoint for ${methodName}`, true);
  wr.out(`app.${getHTTPMethod()}('/v1/${getMethodAlias()}/${getParamStr}', function( req, res ) {` , true)
  wr.indent(1)

  wr.out('try {', true)
  wr.indent(1)
    const argParams = getParams.map( param => 'req.params.'+ param.getName() );
    const postArgs = postParams.length > 0 ? ['req.body'] : []
    const paramList = [...argParams, ...postArgs].join(',')
    // name of the server
    const servername = methodInfo.tags['using'] || 'server'; 
    wr.out(`res.json( ${servername}.${methodName}(${paramList}) );`, true)
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
    const modelClass = utils.findModel(project, className)
    if(modelClass && !definitions[modelClass.getName()]) {
      definitions[modelClass.getName()] = {
        type : 'object',
        properties : {
          ...modelClass.getProperties().reduce( (prev, curr) => {
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
    } else {
      // throw `Model definition for ${className} was not found`
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
  const axiosGetVars = getParams.map( param => ('{' + param.getName() + '}' ) ).join('/')
  const taglist = [];
  if( methodInfo.tags.tag ) {
    taglist.push( methodInfo.tags.tag );
    addTag( methodInfo.tags.tag, '' )
    addTagDescription( methodInfo.tags.tag, methodInfo.tags.tagdescription )
  }
  const previous = state.paths['/' + getMethodAlias() + '/' + axiosGetVars]
  state.paths['/' + getMethodAlias() + '/' + axiosGetVars] = {
    ...previous,
    [getHTTPMethod()]: {
      "parameters" : [
        ...getParams.map( (param) => {
          return {
            name : param.getName(),
            in : "path",
            description :  methodInfo.tags[param.getName()] || '',
            required : true,
            type : getTypeName( param.getType() )
          }          
        }),
        ...postParams.map( (param) => {
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
            required : true,
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

// write axios client endpoint for method
export const WriteClientEndpoint = (wr:R.CodeWriter, project:Project, clName:ClassDeclaration, method:MethodDeclaration ) : R.CodeWriter => {

  const methodInfo = getMethodDoc(method)
  if(methodInfo.tags.nogenerate) return wr

  let methodName = method.getName()
  // only simple parameters
  const validParams = method.getParameters();
  const getParams = method.getParameters().filter( param => isSimpleType(param.getType()) )  
  const postParams = method.getParameters().filter( param => !isSimpleType(param.getType()) )  
  const is_post = method.getParameters().filter( project => !isSimpleType(project.getType()) ).length > 0
  let httpMethod = is_post ? 'post' : 'get';
  // method signature
  const signatureStr = validParams.map( project => {
    return project.getName() + `: ` + getTypeName( project.getType()) 
  }).join(', ')
  const paramsStr = getParams.map( project => project.getName() ).join(', ')
  const postParamsStr = postParams.map( project => project.getName() ).join(', ')

  // setting the body / post varas is not as simple...
  const axiosGetVars = getParams.map( param => ('${' + param.getName() + '}' ) ).join('/') 
  
  if(methodInfo.tags.method) {
    httpMethod = methodInfo.tags.method
  }
  if(methodInfo.tags.alias) {
    methodName = methodInfo.tags.alias
  }  
  switch(httpMethod) {
    case 'post':
      wr.out(`// Service endpoint for ${methodName}`, true);
      wr.out(`async ${methodName}(${signatureStr}) : Promise<${getTypeName(method.getReturnType())}> {`, true)
        wr.indent(1)
        if(is_post) wr.out('// should be posted', true)
        wr.out('return (await axios.post(`/v1/' + methodName + '/'+ axiosGetVars+ '`,'+postParamsStr+')).data;', true)
        wr.indent(-1)
      wr.out(`}`, true) 
      break; 
    case 'get':
      wr.out(`// Service endpoint for ${methodName}`, true);
      wr.out(`async ${methodName}(${signatureStr}) : Promise<${getTypeName(method.getReturnType())}> {`, true)
        wr.indent(1)
        if(is_post) wr.out('// should be posted', true)
        wr.out('return (await axios.get(`/v1/' + methodName + '/'+ axiosGetVars+ '`)).data;', true)
        wr.indent(-1)
      wr.out(`}`, true)  
      break;
    default:
      wr.out(`// Service endpoint for ${methodName}`, true);
      wr.out(`async ${methodName}(${signatureStr}) : Promise<${getTypeName(method.getReturnType())}> {`, true)
        wr.indent(1)
        if(is_post) wr.out('// should be posted', true)
        wr.out('return (await axios.'+httpMethod+'(`/v1/' + methodName + '/'+ axiosGetVars+ '`)).data;', true)
        wr.indent(-1)
      wr.out(`}`, true) 
  }
  return wr;
}
