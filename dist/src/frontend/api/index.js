"use strict";
// Remember to import the model declararations etc. for the
// compiles interface class over here...
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
/**
 * API Client Could be written in here...
 *
 * @client service1
 *
 */
function N(axios) {
    return new /** @class */ (function () {
        function ServerInterface() {
        }
        // client for endpoint putUser
        ServerInterface.prototype.putUser = function (id, overwrite, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.put("/sometest2/v1/user/" + id + "/", user)];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint getUser
        ServerInterface.prototype.getUser = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/users/" + id + "/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint searchByKeyword
        ServerInterface.prototype.searchByKeyword = function (searchKeyword) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/searchByKeyword/", { params: { searchKeyword: searchKeyword } })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint getUserFriends
        ServerInterface.prototype.getUserFriends = function (userId, friendId, filter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/users/" + userId + "/friends/" + friendId + "/", { params: { filter: filter } })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint deleteUser
        ServerInterface.prototype.deleteUser = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.delete("/sometest2/v1/user/" + id + "/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint newfn
        ServerInterface.prototype.newfn = function (s) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/newfn/" + s + "/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint getDevices
        ServerInterface.prototype.getDevices = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/getDevices/" + id + "/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint allUsers
        ServerInterface.prototype.allUsers = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/allUsers/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint users
        ServerInterface.prototype.users = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/users/" + id + "/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint createUser
        ServerInterface.prototype.createUser = function (u) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.post("/sometest2/v1/createUser/", u)];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint setDeviceData
        ServerInterface.prototype.setDeviceData = function (createNewDevice) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.post("/sometest2/v1/setDeviceData/", createNewDevice)];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint obj
        ServerInterface.prototype.obj = function (v) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/obj/" + v + "/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint test3
        ServerInterface.prototype.test3 = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/test3/" + id + "/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint HelloWorld
        ServerInterface.prototype.HelloWorld = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/HelloWorld/" + name + "/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint hello
        ServerInterface.prototype.hello = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/hello/" + name + "/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint custom
        ServerInterface.prototype.custom = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/custom/" + name + "/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        // client for endpoint test
        ServerInterface.prototype.test = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/sometest2/v1/test/", { params: {} })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                });
            });
        };
        return ServerInterface;
    }());
}
exports.N = N;
//# sourceMappingURL=index.js.map