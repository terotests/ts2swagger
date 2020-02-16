"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("robowr");
var yaml = require("js-yaml");
var fs = require("fs");
var API3 = require("../src/OpenAPI3");
// Collect specific classes from the filesystem
// 1. Initializing the project before the parsing
// 2. Reading out the classes from the project which will be used
// 3. Parsing the class information into the REST API endpoint structures
// 4. find out errors after the parsing
// 5. output the parsed data using writer library
describe("Test YAML parser", function () {
    test("Test of how to interpret classes in tests, not a libray test", function () { return __awaiter(void 0, void 0, void 0, function () {
        var fileContents, api, ctx;
        return __generator(this, function (_a) {
            fileContents = fs.readFileSync('./test/openapi/petstore.yaml', 'utf8');
            api = yaml.safeLoad(fileContents);
            ctx = R.Walk(R.CreateContext(api), function (ctx) {
                // converting the type name
                var getTypeName = function (schema) {
                    if (API3.isObject(schema)) {
                        return 'Object';
                    }
                    if (API3.isString(schema)) {
                        return 'string';
                    }
                    if (API3.isInteger(schema)) {
                        return 'number';
                    }
                    if (API3.isBoolean(schema)) {
                        return 'boolean';
                    }
                    return 'any';
                };
                var getProperties = function (s) {
                    if (API3.isRef(s)) {
                        // #/components/schemas/NewPet
                        var name_1 = s.$ref.split('/').pop();
                        var n = ctx.data.components.schemas[name_1];
                        console.log('Reference to ', n);
                        return getProperties(n);
                    }
                    if (API3.isAllOf(s)) {
                        return __spreadArrays(s.allOf.map(getProperties));
                    }
                    if (API3.isObject(s)) {
                        return [Object.keys(s.properties).map(function (key) {
                                return [key + ":" + getTypeName(s.properties[key])];
                            })];
                    }
                    return [];
                };
                var schemas = ctx.data.components.schemas;
                return Object.keys(schemas).map(function (name) {
                    var s = schemas[name];
                    return [
                        "class " + name + " {",
                        function (ctx) { return getProperties(s); },
                        '}'
                    ];
                });
            });
            console.log(ctx.writer.getCode());
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=yaml.test.js.map