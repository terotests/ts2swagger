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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
exports.findModel = function (project, className) {
    var res = null;
    project.getSourceFiles().forEach(function (s) {
        s.getClasses().forEach(function (cl) {
            if (cl.getName() === className) {
                var info = exports.getClassDoc(cl);
                if (info.tags.model != null) {
                    res = cl;
                }
            }
        });
        s.getInterfaces().forEach(function (cl) {
            if (cl.getName() === className) {
                var info = exports.getClassDoc(cl);
                if (info.tags.model != null) {
                    res = cl;
                }
            }
        });
    });
    return res;
};
var JSDocParams = /** @class */ (function () {
    function JSDocParams() {
        this.comment = "";
        this.tags = {};
        this.params = {};
        this.errors = {};
    }
    return JSDocParams;
}());
exports.JSDocParams = JSDocParams;
exports.getFunctionDoc = function (method) {
    var res = new JSDocParams();
    method.getJsDocs().forEach(function (doc) {
        if (doc.getText()) {
            res.comment = doc.compilerNode.comment;
        }
        doc.getTags().forEach(function (tag) {
            if (tag.getTagName() === "error") {
                var str = tag.compilerNode.comment;
                var code = str.split(" ")[0];
                var comment = str.split(" ").pop();
                res.errors[code] = comment;
                return;
            }
            if (tag.getTagName() === "param") {
                var cn = tag.compilerNode;
                res.params[cn.name.escapedText] = tag.compilerNode.comment;
            }
            else {
                res.tags[tag.getTagName()] = tag.compilerNode.comment;
            }
        });
    });
    return res;
};
exports.getMethodDoc = function (method) {
    var res = new JSDocParams();
    method.getJsDocs().forEach(function (doc) {
        if (doc.getText()) {
            res.comment = doc.compilerNode.comment;
        }
        doc.getTags().forEach(function (tag) {
            if (tag.getTagName() === "error") {
                var str = tag.compilerNode.comment;
                var code = str.split(" ")[0];
                var comment = str.split(" ").pop();
                res.errors[code] = comment;
                return;
            }
            if (tag.getTagName() === "param") {
                var cn = tag.compilerNode;
                res.params[cn.name.escapedText] = tag.compilerNode.comment;
            }
            else {
                res.tags[tag.getTagName()] = tag.compilerNode.comment;
            }
        });
    });
    return res;
};
exports.getClassDoc = function (method) {
    var res = new JSDocParams();
    method.getJsDocs().forEach(function (doc) {
        if (doc.getText()) {
            res.comment = doc.compilerNode.comment;
        }
        doc.getTags().forEach(function (tag) {
            if (tag.getTagName() === "param") {
                var cn = tag.compilerNode;
                res.params[cn.name.escapedText] = tag.compilerNode.comment;
            }
            else {
                res.tags[tag.getTagName()] = tag.compilerNode.comment;
            }
        });
    });
    return res;
};
exports.getSwaggerType = function (name, is_array) {
    if (is_array === void 0) { is_array = false; }
    if (is_array)
        return {
            type: "array",
            items: __assign({}, exports.getSwaggerType(name))
        };
    if (name === "string" ||
        name === "number" ||
        name === "boolean" ||
        name === "any")
        return { type: name };
    return { $ref: "#/definitions/" + name };
};
exports.isSimpleType = function (cType) {
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Number) {
        return true;
    }
    if (tp.flags & ts.TypeFlags.String) {
        return true;
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return true;
    }
    return false;
};
exports.isBoolean = function (cType) {
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Boolean) {
        return true;
    }
    return false;
};
exports.getTypePath = function (cType, current) {
    if (current === void 0) { current = []; }
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Number) {
        return ["number"];
    }
    if (tp.flags & ts.TypeFlags.String) {
        return ["string"];
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return ["boolean"];
    }
    if (tp.symbol) {
        var res = [tp.symbol.escapedName];
        var end_1 = [];
        if (cType.getTypeArguments().length > 0) {
            cType.getTypeArguments().forEach(function (arg) {
                end_1 = __spreadArrays(end_1, exports.getTypePath(arg));
            });
        }
        return __spreadArrays(res, end_1);
    }
    return ["any"];
};
exports.getTypeName = function (cType) {
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Number) {
        return "number";
    }
    if (tp.flags & ts.TypeFlags.String) {
        return "string";
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return "boolean";
    }
    if (tp.symbol) {
        var typeName = tp.symbol.escapedName + "";
        if (cType.getTypeArguments().length > 0) {
            typeName +=
                "<" +
                    cType.getTypeArguments().map(function (arg) {
                        // console.log(arg)
                        return exports.getTypeName(arg);
                    }) +
                    ">";
        }
        return typeName;
    }
    return "any";
};
exports.getMethodReturnTypeName = function (checker, m) {
    var cType = m.getReturnType();
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Number) {
        return "number";
    }
    if (tp.flags & ts.TypeFlags.String) {
        return "string";
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return "boolean";
    }
    if (tp.flags & ts.TypeFlags.Union) {
        console.log("-union type found");
        return cType
            .getUnionTypes()
            .map(function (t) { return exports.getTypeName(t); })
            .join("|");
    }
    if (tp.symbol) {
        var typeName = tp.symbol.escapedName + "";
        if (cType.getTypeArguments().length > 0) {
            typeName +=
                "<" +
                    cType.getTypeArguments().map(function (arg) {
                        // console.log(arg)
                        return exports.getTypeName(arg);
                    }) +
                    ">";
        }
        return typeName;
    }
    return "any";
};
//# sourceMappingURL=index.js.map