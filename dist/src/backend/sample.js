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
var express = require("express");
var fs_1 = require("fs");
var model_1 = require("./models/model");
var app = express();
/**
 * Freeform test of the API comes here
 *
 * @swagger /src/swagger/sample.json
 * @title The title of the Doc
 * @service myserviceid
 * @endpoint /sometest/v1/
 * @version 1.0.1
 */
var MyService = /** @class */ (function () {
    function MyService(req, res) {
        this.req = req;
        this.res = res;
    }
    MyService.prototype.getUserName = function () { };
    MyService.prototype.ping = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "you sent " + message];
            });
        });
    };
    /**
     * @alias hello
     */
    MyService.prototype.sayHello = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (name === "foo")
                    throw { errorCode: 404, message: "User not found" };
                return [2 /*return*/, "Hello " + name + "!!!"];
            });
        });
    };
    MyService.prototype.getDevice = function (id, yesno, what) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [{ id: id, name: "iPhone" }]];
            });
        });
    };
    /**
     * @query id
     */
    MyService.prototype.getDeviceSecond = function (id, yesno, what) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [{ id: id, name: "iPhone" }]];
            });
        });
    };
    /**
     * @method post
     * @upload file
     * @uploadmeta into
     * @uploadmetadesc send JSON encoded string here...
     */
    MyService.prototype.upload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // output results to some file...
                // this.req.pipe( )
                this.req.pipe(fs_1.default.createWriteStream(__dirname + "/uploadedFile.bin"));
                return [2 /*return*/, 0];
            });
        });
    };
    MyService.prototype.testAnyResp = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // This example does not work properly
                try {
                    if (value === "error")
                        throw { mistake: true };
                    return [2 /*return*/, new model_1.AnyResponse("OK", "")];
                }
                catch (e) {
                    return [2 /*return*/, new model_1.AnyResponse(null, e)];
                }
                return [2 /*return*/];
            });
        });
    };
    MyService.prototype.recursiveTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        name: "OK",
                        children: [{ name: "Child", children: [] }]
                    }];
            });
        });
    };
    return MyService;
}());
exports.MyService = MyService;
/**
 * @model true
 */
var Device = /** @class */ (function () {
    function Device() {
    }
    return Device;
}());
exports.Device = Device;
//# sourceMappingURL=sample.js.map