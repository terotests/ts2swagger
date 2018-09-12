"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("../utils");
var getTypeName = utils.getTypeName;
var isSimpleType = utils.isSimpleType;
var getTypePath = utils.getTypePath;
var getSwaggerType = utils.getSwaggerType;
var getMethodDoc = utils.getMethodDoc;
exports.initSwagger = function (wr, service) {
    var base = {
        "swagger": "2.0",
        "basePath": service.endpoint || '/v1/',
        "paths": {},
        "definitions": {},
        "schemes": ["http", "https"],
        "info": {
            "version": service.version,
            "title": service.title || '',
            "description": service.description || '',
            "termsOfService": service.tos || '',
        },
        tags: []
    };
    wr.getState().swagger = base;
    return wr;
};
exports.WriteEndpoint = function (wr, project, clName, method) {
    var _a;
    var methodInfo = getMethodDoc(method);
    if (methodInfo.tags.nogenerate)
        return wr;
    var methodName = method.getName();
    var getParams = method.getParameters().filter(function (param) { return isSimpleType(param.getType()); });
    var postParams = method.getParameters().filter(function (param) { return !isSimpleType(param.getType()); });
    var is_post = method.getParameters().filter(function (project) { return !isSimpleType(project.getType()); }).length > 0;
    var httpMethod = is_post ? 'post' : 'get';
    var getParamStr = getParams.map(function (param) {
        return ':' + param.getName();
    }).join('/');
    var getMethodAlias = function () {
        return methodInfo.tags.alias || methodName;
    };
    var getHTTPMethod = function () {
        return methodInfo.tags.method || httpMethod;
    };
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
    wr.out("// Service endpoint for " + methodName, true);
    wr.out("app." + getHTTPMethod() + "('/v1/" + getMethodAlias() + "/" + getParamStr + "', function( req, res ) {", true);
    wr.indent(1);
    wr.out('try {', true);
    wr.indent(1);
    var argParams = getParams.map(function (param) { return 'req.params.' + param.getName(); });
    var postArgs = postParams.length > 0 ? ['req.body'] : [];
    var paramList = argParams.concat(postArgs).join(',');
    // name of the server
    var servername = methodInfo.tags['using'] || 'server';
    wr.out("res.json( " + servername + "." + methodName + "(" + paramList + ") );", true);
    wr.indent(-1);
    wr.out('} catch(e) {', true);
    wr.indent(1);
    wr.out('res.status(400);', true);
    wr.out("res.json( e.message );", true);
    wr.indent(-1);
    wr.out('}', true);
    wr.indent(-1);
    wr.out("})", true);
    var rArr = getTypePath(method.getReturnType());
    var is_array = rArr[0] === 'Array';
    var rType = rArr.pop();
    var successResponse = {};
    var definitions = {};
    var createClassDef = function (className) {
        var modelClass = utils.findModel(project, className);
        if (modelClass && !definitions[modelClass.getName()]) {
            definitions[modelClass.getName()] = {
                type: 'object',
                properties: __assign({}, modelClass.getProperties().reduce(function (prev, curr) {
                    var _a;
                    var rArr = getTypePath(curr.getType());
                    var is_array = rArr[0] === 'Array';
                    var rType = rArr.pop();
                    var swType = getSwaggerType(rType, is_array);
                    createClassDef(rType);
                    return __assign({}, prev, (_a = {}, _a[curr.getName()] = __assign({}, swType), _a));
                }, {}))
            };
        }
        else {
            // throw `Model definition for ${className} was not found`
        }
    };
    successResponse['200'] = {
        description: '',
        schema: __assign({}, getSwaggerType(rType, is_array))
    };
    createClassDef(rType);
    // generate swagger docs of this endpoin, a simple version so far
    var state = wr.getState().swagger;
    var validParams = method.getParameters();
    var axiosGetVars = getParams.map(function (param) { return ('{' + param.getName() + '}'); }).join('/');
    var taglist = [];
    if (methodInfo.tags.tag) {
        taglist.push(methodInfo.tags.tag);
        addTag(methodInfo.tags.tag, '');
        addTagDescription(methodInfo.tags.tag, methodInfo.tags.tagdescription);
    }
    var previous = state.paths['/' + getMethodAlias() + '/' + axiosGetVars];
    state.paths['/' + getMethodAlias() + '/' + axiosGetVars] = __assign({}, previous, (_a = {}, _a[getHTTPMethod()] = {
        "parameters": getParams.map(function (param) {
            return {
                name: param.getName(),
                in: "path",
                description: methodInfo.tags[param.getName()] || '',
                required: true,
                type: getTypeName(param.getType())
            };
        }).concat(postParams.map(function (param) {
            var rArr = getTypePath(param.getType());
            var is_array = rArr[0] === 'Array';
            var rType = rArr.pop();
            var tDef = {
                schema: __assign({}, getSwaggerType(rType, is_array))
            };
            if (isSimpleType(param.getType())) {
                tDef = {
                    type: rType
                };
            }
            else {
                createClassDef(rType);
            }
            return __assign({ name: param.getName(), in: "body", description: methodInfo.tags[param.getName()] || '', required: true }, tDef);
        })),
        "description": methodInfo.tags.description || methodInfo.comment,
        "summary": methodInfo.tags.summary || methodInfo.tags.description || methodInfo.comment,
        "produces": [
            "application/json"
        ],
        "responses": __assign({}, successResponse),
        "tags": taglist
    }, _a));
    state.definitions = Object.assign(state.definitions, definitions);
    return wr;
};
// write axios client endpoint for method
exports.WriteClientEndpoint = function (wr, project, clName, method) {
    var methodInfo = getMethodDoc(method);
    if (methodInfo.tags.nogenerate)
        return wr;
    var methodName = method.getName();
    // only simple parameters
    var validParams = method.getParameters();
    var getParams = method.getParameters().filter(function (param) { return isSimpleType(param.getType()); });
    var postParams = method.getParameters().filter(function (param) { return !isSimpleType(param.getType()); });
    var is_post = method.getParameters().filter(function (project) { return !isSimpleType(project.getType()); }).length > 0;
    var httpMethod = is_post ? 'post' : 'get';
    // method signature
    var signatureStr = validParams.map(function (project) {
        return project.getName() + ": " + getTypeName(project.getType());
    }).join(', ');
    var paramsStr = getParams.map(function (project) { return project.getName(); }).join(', ');
    var postParamsStr = postParams.map(function (project) { return project.getName(); }).join(', ');
    // setting the body / post varas is not as simple...
    var axiosGetVars = getParams.map(function (param) { return ('${' + param.getName() + '}'); }).join('/');
    if (methodInfo.tags.method) {
        httpMethod = methodInfo.tags.method;
    }
    if (methodInfo.tags.alias) {
        methodName = methodInfo.tags.alias;
    }
    switch (httpMethod) {
        case 'post':
            wr.out("// Service endpoint for " + methodName, true);
            wr.out("async " + methodName + "(" + signatureStr + ") : Promise<" + getTypeName(method.getReturnType()) + "> {", true);
            wr.indent(1);
            if (is_post)
                wr.out('// should be posted', true);
            wr.out('return (await axios.post(`/v1/' + methodName + '/' + axiosGetVars + '`,' + postParamsStr + ')).data;', true);
            wr.indent(-1);
            wr.out("}", true);
            break;
        case 'get':
            wr.out("// Service endpoint for " + methodName, true);
            wr.out("async " + methodName + "(" + signatureStr + ") : Promise<" + getTypeName(method.getReturnType()) + "> {", true);
            wr.indent(1);
            if (is_post)
                wr.out('// should be posted', true);
            wr.out('return (await axios.get(`/v1/' + methodName + '/' + axiosGetVars + '`)).data;', true);
            wr.indent(-1);
            wr.out("}", true);
            break;
        default:
            wr.out("// Service endpoint for " + methodName, true);
            wr.out("async " + methodName + "(" + signatureStr + ") : Promise<" + getTypeName(method.getReturnType()) + "> {", true);
            wr.indent(1);
            if (is_post)
                wr.out('// should be posted', true);
            wr.out('return (await axios.' + httpMethod + '(`/v1/' + methodName + '/' + axiosGetVars + '`)).data;', true);
            wr.indent(-1);
            wr.out("}", true);
    }
    return wr;
};
//# sourceMappingURL=service.js.map