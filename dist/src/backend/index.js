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
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var swaggerUi = require('swagger-ui-express');
// sample server...
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../../swagger/api.json')));
// app.use('/api-docs2', swaggerUi.serve, swaggerUi.setup(require('../../swagger/server2.json')));
// generated routes for the app 
var api_1 = require("./api");
/**
 *
 * @rewrite server
 * @service service1
 * @param app
 *
 */
function automaticServices(app, server) {
    // Service endpoint for putUser
    app.put('/sometest2/v1/user/:id/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).putUser(req.params.id, typeof (req.query.overwrite) === 'undefined' ? req.query.overwrite : req.query.overwrite === 'true', req.body)];
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
    // Service endpoint for getUser
    app.get('/sometest2/v1/users/:id/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).getUser(req.params.id)];
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
    // Service endpoint for searchByKeyword
    app.get('/sometest2/v1/searchByKeyword/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).searchByKeyword(req.query.searchKeyword)];
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
    // Service endpoint for getUserFriends
    app.get('/sometest2/v1/users/:userId/friends/:friendId/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).getUserFriends(req.params.userId, req.params.friendId, req.query.filter)];
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
    // Service endpoint for deleteUser
    app.delete('/sometest2/v1/user/:id/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).deleteUser(req.params.id)];
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
    // Service endpoint for newfn
    app.get('/sometest2/v1/newfn/:s/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).newfn(req.params.s)];
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
    // Service endpoint for getDevices
    app.get('/sometest2/v1/getDevices/:id/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).getDevices(req.params.id)];
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
    // Service endpoint for allUsers
    app.get('/sometest2/v1/allUsers/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).allUsers()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _c.sent();
                        res.status(e_8.statusCode || 400);
                        res.json(e_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Service endpoint for users
    app.get('/sometest2/v1/users/:id/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_9;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).users(req.params.id)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_9 = _c.sent();
                        res.status(e_9.statusCode || 400);
                        res.json(e_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Service endpoint for createUser
    app.post('/sometest2/v1/createUser/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).createUser(req.body)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_10 = _c.sent();
                        res.status(e_10.statusCode || 400);
                        res.json(e_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Service endpoint for setDeviceData
    app.post('/sometest2/v1/setDeviceData/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_11;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).setDeviceData(req.body)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_11 = _c.sent();
                        res.status(e_11.statusCode || 400);
                        res.json(e_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Service endpoint for obj
    app.get('/sometest2/v1/obj/:v/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_12;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).obj(req.params.v)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_12 = _c.sent();
                        res.status(e_12.statusCode || 400);
                        res.json(e_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Service endpoint for test3
    app.get('/sometest2/v1/test3/:id/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_13;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).test3(req.params.id)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_13 = _c.sent();
                        res.status(e_13.statusCode || 400);
                        res.json(e_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Service endpoint for HelloWorld
    app.get('/sometest2/v1/HelloWorld/:name/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_14;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).HelloWorld(req.params.name)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_14 = _c.sent();
                        res.status(e_14.statusCode || 400);
                        res.json(e_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Service endpoint for hello
    app.get('/sometest2/v1/hello/:name/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_15;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, server(req, res).hello(req.params.name)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_15 = _c.sent();
                        res.status(e_15.statusCode || 400);
                        res.json(e_15);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    // Service endpoint for custom
    app.get('/sometest2/v1/custom/:name/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var e_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, server(req, res).custom(req.params.name)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_16 = _a.sent();
                        res.status(e_16.statusCode || 400);
                        res.json(e_16);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
}
// initialize the API endpoint
automaticServices(app, function (req, res) { return new api_1.ServerInterface(req, res); });
if (!module.parent) {
    app.listen(1337);
    console.log('listening on port 1337');
}
//# sourceMappingURL=index.js.map