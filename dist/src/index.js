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
var InterfaceState = /** @class */ (function () {
    function InterfaceState() {
    }
    return InterfaceState;
}());
exports.InterfaceState = InterfaceState;
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    SomeClass.prototype.say = function () {
        console.log('say..', this.x);
    };
    return SomeClass;
}());
var SomeClass2 = /** @class */ (function () {
    function SomeClass2() {
    }
    SomeClass2.prototype.say = function () {
        console.log('say..', this.x);
    };
    return SomeClass2;
}());
function abc(obj) {
    obj.say();
    // console.log('abc called...', obj.x.length)
}
/*
project:Project, clName:ClassDeclaration, method:MethodDeclaration
*/
function createProject(settings) {
    return __awaiter(this, void 0, void 0, function () {
        var project, RFs, obj1, obj2, baseWriter, baseState, services;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    project = new ts_simple_ast_1.default();
                    project.addExistingSourceFiles([settings.path + "/**/*.ts"]); // , "!**/*.d.ts"
                    RFs = new R.CodeFileSystem();
                    obj1 = new SomeClass();
                    obj2 = new SomeClass();
                    abc(obj1);
                    abc(obj2);
                    baseWriter = RFs.getFile('/', 'index.ts').getWriter();
                    baseState = new InterfaceState();
                    baseState.currentProject = project;
                    // continuer with this...
                    baseWriter.setState(baseState);
                    services = baseWriter.getState().services = {};
                    // mapeservice classes to the properties
                    project.getSourceFiles().forEach(function (sourceFile) {
                        sourceFile.getClasses().forEach(function (c) {
                            c.getJsDocs().forEach(function (doc) {
                                var is_service = doc.getTags().filter(function (tag) { return tag.getName() === 'service'; }).length > 0;
                                if (is_service) {
                                    baseWriter.getState().services[c.getName()] = {
                                        description: doc.getComment()
                                    };
                                    doc.getTags().forEach(function (tag) {
                                        baseWriter.getState().services[c.getName()][tag.getName()] = tag.getComment();
                                    });
                                }
                            });
                        });
                        sourceFile.getClasses().forEach(function (c) {
                            if (services[c.getName()]) {
                                var serviceinfo_1 = services[c.getName()];
                                ProgrammerBase.initSwagger(baseWriter, serviceinfo_1);
                                var injectWriter_1 = new R.CodeWriter();
                                c.getMethods().forEach(function (m) {
                                    ProgrammerBase.WriteEndpoint(injectWriter_1, project, c, m);
                                    // if(clientWriter) ProgrammerBase.WriteClientEndpoint( clientWriter, project, c, m )
                                });
                                // inject declaration to some function...
                                project.getSourceFiles().forEach(function (s) {
                                    s.getFunctions().forEach(function (f) {
                                        var info = utils_1.getFunctionDoc(f);
                                        // console.log(f.getName(), info)
                                        if (info.tags.service === serviceinfo_1.service) {
                                            f.setBodyText(function (writer) {
                                                writer.setIndentationLevel('  ').write(injectWriter_1.getCode());
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