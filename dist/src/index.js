"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_simple_ast_1 = require("ts-simple-ast");
var R = require("robowr");
var ProgrammerBase = require("./programmer/service");
var utils_1 = require("./utils");
var path = require('path');
var CInterfaceState = /** @class */ (function () {
    function CInterfaceState() {
        this.currentClass = {};
        this.currentMethod = {};
        this.currentFunction = {};
        this.paramTypes = [];
    }
    CInterfaceState.prototype.clone = function (args) {
        return Object.assign(Object.create(this), this, args);
    };
    return CInterfaceState;
}());
exports.CInterfaceState = CInterfaceState;
exports.isServiceClass = function (ctx) { return ctx.currentClass.JSDoc.hasTag('service'); };
exports.initSwaggerForService = function (ctx) {
    var service = ctx.currentClass.JSDoc;
    return {
        "swagger": "2.0",
        "basePath": service.getTag('endpoint') || '/v1/',
        "paths": {},
        "definitions": {},
        "schemes": ["http", "https"],
        "info": {
            "version": service.getTag('version'),
            "title": service.getTag('title') || '',
            "description": service.getTag('description') || '',
            "termsOfService": service.getTag('tos') || '',
        },
        tags: []
    };
};
exports.isModelClass = function (ctx) {
    return utils_1.getClassDoc(ctx.currentClass.declaration).hasTag('model');
};
exports.findModel = function (ctx, className) {
    var res = null;
    ctx.currentProject.getSourceFiles().forEach(function (s) {
        s.getClasses().forEach(function (cl) {
            ctx.clone({ currentClass: {
                    declaration: cl
                } });
            if (cl.getName() === className) {
                var info = utils_1.getClassDoc(cl);
                if (info.tags.model) {
                    res = cl;
                }
            }
        });
        s.getInterfaces().forEach(function (cl) {
            if (cl.getName() === className) {
                var info = utils_1.getClassDoc(cl);
                if (info.tags.model) {
                    res = cl;
                }
            }
        });
    });
    return res;
};
exports.CollectEndpointParams = function (ctx) {
    // wr:R.CodeWriter, project:Project, clName:ClassDeclaration, method:MethodDeclaration
    var wr = ctx.wr;
    var result = ctx.clone({
        paramTypes: []
    });
    // basic
    var methodInfo = ctx.currentMethod.JSDoc;
    var method = ctx.currentMethod.declaration;
    if (ctx.currentMethod.JSDoc.hasTag('nogenerate'))
        return result;
    // the URL path for this method...
    var methodName = method.getName();
    var methodAlias = methodInfo.tags.alias || methodName;
    var basePath = ctx.currentClass.JSDoc.getTag('endpoint');
    var pathParams = [];
    var queryParams = [];
    var bodyParams = [];
    var path = methodAlias.split('/'); // for example "users/documents"
    var methodParams = method.getParameters();
    for (var i = 0; i < path.length; i++) {
        if (methodParams[i] && !(methodParams[i].getName() === methodInfo.tags.query) && utils_1.isSimpleType(methodParams[i].getType())) {
            // only ID types here
            pathParams.push(methodParams[i]);
        }
        else {
            break; // no more
        }
    }
    // collect query parameters after the path parameters
    for (var i = pathParams.length; i < methodParams.length; i++) {
        if (utils_1.isSimpleType(methodParams[i].getType())) {
            // only ID types here
            queryParams.push(methodParams[i]);
        }
        else {
            break; // no more
        }
    }
    // collect post parameters after the path parameters
    for (var i = (pathParams.length + queryParams.length); i < methodParams.length; i++) {
        bodyParams.push(methodParams[i]);
        var paramDef = utils_1.toSwaggerType(methodParams[i].getType());
        var model = exports.findModel(ctx, paramDef.lastType);
        if (model !== null) {
            result.paramTypes.push(paramDef);
        }
    }
    result.queryParams = queryParams;
    result.pathParams = pathParams;
    result.bodyParams = bodyParams;
    result.returnType = utils_1.toSwaggerType(method.getReturnType());
    result.isReturnTypeModel = exports.findModel(ctx, result.returnType.lastType) !== null;
    result.is_post = bodyParams.length > 0;
    result.httpMethod = methodInfo.tags.method || (result.is_post ? 'post' : 'get');
    result.pathParamStr = pathParams.map(function (param) {
        return ':' + param.getName();
    }).join('/');
    // Collects all tags from the method
    var addTag = function (tagname, description) {
        var swagger = wr.getState().swagger;
        if (swagger.tags.filter(function (t) { return t.name === tagname; }).length === 0) {
            swagger.tags.push({ name: tagname, description: description });
        }
    };
    var addTagDescription = function (tagname, description) {
        var swagger = wr.getState().swagger;
        var tag = swagger.tags.filter(function (t) { return t.name === tagname; }).pop();
        if (tag && description) {
            tag.description = description;
        }
    };
    var taglist = [];
    if (methodInfo.tags.tag) {
        taglist.push(methodInfo.tags.tag);
        addTag(methodInfo.tags.tag, '');
        addTagDescription(methodInfo.tags.tag, methodInfo.tags.tagdescription);
    }
    // build the path for api path
    var apiPath = '';
    path.forEach(function (pathPart, i) {
        apiPath += pathPart + '/';
        if (pathParams[i]) {
            apiPath += ':' + pathParams[i].getName() + '/';
        }
    });
    result.apiPath = apiPath;
    return result;
};
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
function createProject(settings) {
    return __awaiter(this, void 0, void 0, function () {
        var project, RFs, baseWriter, ctx, services;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    project = new ts_simple_ast_1.default();
                    project.addExistingSourceFiles([settings.path + "/**/*.ts"]); // , "!**/*.d.ts"
                    RFs = new R.CodeFileSystem();
                    baseWriter = RFs.getFile('/', 'index.ts').getWriter();
                    ctx = new CInterfaceState();
                    ctx.currentProject = project;
                    // continuer with this...
                    baseWriter.setState(ctx);
                    ctx.wr = baseWriter;
                    services = baseWriter.getState().services = {};
                    // mapeservice classes to the properties
                    project.getSourceFiles().forEach(function (sourceFile) {
                        ctx.currentSourceFile = sourceFile;
                        sourceFile.getClasses().forEach(function (c) {
                            ctx.currentClass.declaration = c;
                            ctx.currentClass.JSDoc = utils_1.getClassDoc(c);
                            if (settings.isServiceClass(ctx)) {
                                baseWriter.getState().swagger = settings.initSwaggerForService(ctx);
                                var injectWriter_1 = new R.CodeWriter();
                                c.getMethods().forEach(function (m) {
                                    ctx.currentMethod = {
                                        declaration: m,
                                        JSDoc: utils_1.getMethodDoc(m)
                                    };
                                    var endpoint = exports.CollectEndpointParams(ctx);
                                    console.log(m.getName(), '=>', endpoint.apiPath, ' param types len ', endpoint.paramTypes.length);
                                    if (endpoint.isReturnTypeModel) {
                                        console.log('^ returns model ', endpoint.returnType.lastType);
                                    }
                                    ProgrammerBase.WriteEndpoint(injectWriter_1, project, c, m);
                                    // if(clientWriter) ProgrammerBase.WriteClientEndpoint( clientWriter, project, c, m )
                                });
                                // search project for possible endpoints where to write this...
                                project.getSourceFiles().forEach(function (s) {
                                    s.getFunctions().forEach(function (f) {
                                        var info = utils_1.getFunctionDoc(f);
                                        // console.log(f.getName(), info)
                                        if (info.tags.service === ctx.currentClass.JSDoc.getTag('service')) {
                                            f.setBodyText(function (writer) {
                                                writer.setIndentationLevel('  ').write(injectWriter_1.getCode());
                                            });
                                        }
                                    });
                                });
                                // create swagger file
                                var swaggerPath = ctx.currentClass.JSDoc.getTag('swagger');
                                if (swaggerPath) {
                                    var swagger = RFs.getFile(path.dirname(swaggerPath), path.basename(swaggerPath)).getWriter();
                                    swagger.raw(JSON.stringify(swagger.getState().swagger, null, 2));
                                }
                            }
                        });
                        sourceFile.getClasses().forEach(function (c) {
                            if (services[c.getName()]) {
                                var serviceinfo_1 = services[c.getName()];
                                ProgrammerBase.initSwagger(baseWriter, serviceinfo_1);
                                var injectWriter_2 = new R.CodeWriter();
                                c.getMethods().forEach(function (m) {
                                    ProgrammerBase.WriteEndpoint(injectWriter_2, project, c, m);
                                    // if(clientWriter) ProgrammerBase.WriteClientEndpoint( clientWriter, project, c, m )
                                });
                                // inject declaration to some function...
                                project.getSourceFiles().forEach(function (s) {
                                    s.getFunctions().forEach(function (f) {
                                        var info = utils_1.getFunctionDoc(f);
                                        // console.log(f.getName(), info)
                                        if (info.tags.service === serviceinfo_1.service) {
                                            f.setBodyText(function (writer) {
                                                writer.setIndentationLevel('  ').write(injectWriter_2.getCode());
                                            });
                                        }
                                    });
                                });
                                // create swagger file
                                var swaggerPath = serviceinfo_1.swagger;
                                if (swaggerPath) {
                                    var swagger = RFs.getFile(path.dirname(swaggerPath), path.basename(swaggerPath)).getWriter();
                                    swagger.raw(JSON.stringify(swagger.getState().swagger, null, 2));
                                }
                            }
                        });
                    });
                    return [4 /*yield*/, RFs.saveTo('./', false)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, project.save()];
                case 2:
                    _a.sent();
                    console.log('Project saved');
                    return [2 /*return*/];
            }
        });
    });
}
exports.createProject = createProject;
//# sourceMappingURL=index.js.map