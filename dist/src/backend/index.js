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
var sample_1 = require("./sample");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static("public"));
var swaggerUi = require("swagger-ui-express");
// sample server...
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("../../swagger/sample.json")));
/**
 * @service myserviceid
 */
function bootstrap(app, server) {
    // Automatically generated endpoint for ping
    app.get("/sometest/v1/ping/:message/", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        if (typeof req.params.message !== "string")
                            throw { statusCode: 422 };
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).ping(req.params.message)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _c.sent();
                        res.status(e_1.statusCode || 400);
                        res.json(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Automatically generated endpoint for sayHello
    app.get("/sometest/v1/hello/:name/", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        if (typeof req.params.name !== "string")
                            throw { statusCode: 422 };
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).sayHello(req.params.name)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _c.sent();
                        res.status(e_2.statusCode || 400);
                        res.json(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Automatically generated endpoint for getDevice
    app.get("/sometest/v1/getDevice/:id/", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var maybe_id, id, yesno, _a, _b, e_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        maybe_id = parseInt(String(req.params.id));
                        id = !isNaN(maybe_id) && Number.isInteger(maybe_id) && maybe_id >= 0
                            ? maybe_id
                            : null;
                        if (id === null)
                            throw { statusCode: 422 };
                        yesno = req.query.yesno === "true"
                            ? true
                            : req.query.yesno === "false"
                                ? false
                                : req.query.yesno;
                        if (typeof yesno !== "boolean")
                            throw { statusCode: 422 };
                        if (typeof req.query.what !== "string")
                            throw { statusCode: 422 };
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).getDevice(id, yesno, req.query.what)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _c.sent();
                        res.status(e_3.statusCode || 400);
                        res.json(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Automatically generated endpoint for getDeviceSecond
    app.get("/sometest/v1/getDeviceSecond/", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var maybe_id, id, yesno, _a, _b, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        maybe_id = parseInt(String(req.query.id));
                        id = !isNaN(maybe_id) && Number.isInteger(maybe_id) && maybe_id >= 0
                            ? maybe_id
                            : null;
                        if (id === null)
                            throw { statusCode: 422 };
                        yesno = req.query.yesno === "true"
                            ? true
                            : req.query.yesno === "false"
                                ? false
                                : req.query.yesno;
                        if (typeof yesno !== "boolean")
                            throw { statusCode: 422 };
                        if (typeof req.query.what !== "string")
                            throw { statusCode: 422 };
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).getDeviceSecond(id, yesno, req.query.what)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _c.sent();
                        res.status(e_4.statusCode || 400);
                        res.json(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Automatically generated endpoint for upload
    app.post("/sometest/v1/upload/", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).upload()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _c.sent();
                        res.status(e_5.statusCode || 400);
                        res.json(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Automatically generated endpoint for testAnyResp
    app.get("/sometest/v1/testAnyResp/:value/", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        if (typeof req.params.value !== "string")
                            throw { statusCode: 422 };
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).testAnyResp(req.params.value)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _c.sent();
                        res.status(e_6.statusCode || 400);
                        res.json(e_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Automatically generated endpoint for recursiveTest
    app.get("/sometest/v1/recursiveTest/", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).recursiveTest()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _c.sent();
                        res.status(e_7.statusCode || 400);
                        res.json(e_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
}
// initialize the API endpoint
bootstrap(app, function (req, res) { return new sample_1.MyService(req, res); });
if (!module.parent) {
    app.listen(1337);
    console.log("listening on port 1337");
}
//# sourceMappingURL=index.js.map