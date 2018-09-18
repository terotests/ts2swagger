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
var ts = require("typescript");
exports.findModel = function (project, className) {
    var res = null;
    project.getSourceFiles().forEach(function (s) {
        s.getClasses().forEach(function (cl) {
            if (cl.getName() === className) {
                var info = exports.getClassDoc(cl);
                if (info.tags.model) {
                    res = cl;
                }
            }
        });
        s.getInterfaces().forEach(function (cl) {
            if (cl.getName() === className) {
                var info = exports.getClassDoc(cl);
                if (info.tags.model) {
                    res = cl;
                }
            }
        });
    });
    return res;
};
var JSDocParams = /** @class */ (function () {
    function JSDocParams() {
        this.comment = '';
        this.tags = {};
        this.params = {};
        this.errors = {};
    }
    return JSDocParams;
}());
exports.JSDocParams = JSDocParams;
exports.getFunctionDoc = function (method) {
    var res = new JSDocParams;
    method.getJsDocs().forEach(function (doc) {
        if (doc.getComment()) {
            res.comment = doc.getComment();
        }
        doc.getTags().forEach(function (tag) {
            if (tag.getName() === 'error') {
                var str = tag.getComment();
                var code = str.split(' ')[0];
                var comment = str.split(' ').pop();
                res.errors[code] = comment;
                return;
            }
            if (tag.getName() === 'param') {
                var cn = tag.compilerNode;
                res.params[cn.name.escapedText] = tag.getComment();
            }
            else {
                res.tags[tag.getName()] = tag.getComment();
            }
        });
    });
    return res;
};
exports.getMethodDoc = function (method) {
    var res = new JSDocParams;
    method.getJsDocs().forEach(function (doc) {
        if (doc.getComment()) {
            res.comment = doc.getComment();
        }
        doc.getTags().forEach(function (tag) {
            if (tag.getName() === 'error') {
                var str = tag.getComment();
                var code = str.split(' ')[0];
                var comment = str.split(' ').pop();
                res.errors[code] = comment;
                return;
            }
            if (tag.getName() === 'param') {
                var cn = tag.compilerNode;
                res.params[cn.name.escapedText] = tag.getComment();
            }
            else {
                res.tags[tag.getName()] = tag.getComment();
            }
        });
    });
    return res;
};
exports.getClassDoc = function (method) {
    var res = new JSDocParams;
    method.getJsDocs().forEach(function (doc) {
        if (doc.getComment()) {
            res.comment = doc.getComment();
        }
        doc.getTags().forEach(function (tag) {
            if (tag.getName() === 'param') {
                var cn = tag.compilerNode;
                res.params[cn.name.escapedText] = tag.getComment();
            }
            else {
                res.tags[tag.getName()] = tag.getComment();
            }
        });
    });
    return res;
};
exports.getSwaggerType = function (name, is_array) {
    if (is_array === void 0) { is_array = false; }
    if (is_array)
        return {
            type: 'array',
            items: __assign({}, exports.getSwaggerType(name))
        };
    if (name === 'string' || name === 'number' || name === 'boolean')
        return { type: name };
    return { '$ref': '#/definitions/' + name };
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
        return ['number'];
    }
    if (tp.flags & ts.TypeFlags.String) {
        return ['string'];
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return ['boolean'];
    }
    if (tp.symbol) {
        var res = [tp.symbol.escapedName];
        var end_1 = [];
        if (cType.getTypeArguments().length > 0) {
            cType.getTypeArguments().forEach(function (arg) {
                end_1 = end_1.concat(exports.getTypePath(arg));
            });
        }
        return res.concat(end_1);
    }
    return ['any'];
};
exports.getTypeName = function (cType) {
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Number) {
        return 'number';
    }
    if (tp.flags & ts.TypeFlags.String) {
        return 'string';
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return 'boolean';
    }
    if (tp.symbol) {
        var typeName = tp.symbol.escapedName + '';
        if (cType.getTypeArguments().length > 0) {
            typeName += '<' + cType.getTypeArguments().map(function (arg) {
                // console.log(arg)
                return exports.getTypeName(arg);
            }) + '>';
        }
        return typeName;
    }
    return 'any';
};
exports.getMethodReturnTypeName = function (checker, m) {
    var cType = m.getReturnType();
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Number) {
        return 'number';
    }
    if (tp.flags & ts.TypeFlags.String) {
        return 'string';
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return 'boolean';
    }
    if (tp.flags & ts.TypeFlags.Union) {
        console.log('-union type found');
        return cType.getUnionTypes().map(function (t) { return exports.getTypeName(t); }).join('|');
    }
    if (tp.symbol) {
        var typeName = tp.symbol.escapedName + '';
        if (cType.getTypeArguments().length > 0) {
            typeName += '<' + cType.getTypeArguments().map(function (arg) {
                // console.log(arg)
                return exports.getTypeName(arg);
            }) + '>';
        }
        return typeName;
    }
    return 'any';
};
/*
export const getTypeName = function(checker:TypeChecker, node:T ) {

  const tp = type.
  if(tp.flags & ts.TypeFlags.Number) {
    console.log('Number type')
  }
  if(tp.flags & ts.TypeFlags.String) {
    console.log('String type')
  }
  if(tp.symbol) {
    console.log('Class ', tp.symbol.escapedName)
  }

}
*/
function walkClasses(project, sourceFile) {
    function rewriteFunctions(list) {
        list.forEach(function (fn) {
            if (fn.getName() === 'compilerInsertTest') {
                console.log('--> Found the function ....');
                fn.setBodyText(function (writer) {
                    writer.write('for( let i=0; i< 10; i++)').block(function () {
                        writer.writeLine('console.log(i);');
                    });
                    writer.write('return 1450;');
                });
            }
        });
    }
    sourceFile.getClasses().forEach(function (c) {
        var is_service = false;
        var className = c.getName();
        console.log('---- Class ', c.getName(), '-----');
        c.getTypeParameters().forEach(function (typeParam) {
            console.log('Parameter', typeParam.getType().getText());
            // console.log(typeParam)
        });
        c.getDecorators().forEach(function (dec) {
            console.log('Class Decorator', dec.getFullName());
            is_service = (dec.getFullName() === 'Service');
            dec.getArguments().forEach(function (arg) {
                if (arg.getType().compilerType.flags & ts.TypeFlags.StringLiteral) {
                    console.log(' String literal argument ', arg.getFullText());
                }
            });
        });
        c.getProperties().forEach(function (m) {
            console.log('** member: ', m.getName());
            m.getDecorators().forEach(function (dec) {
                console.log('Member Decorator', dec.getFullName());
                // check arrow function return types etc.
                dec.getArguments().forEach(function (arg) {
                    /*
                    if( arg.getType().compilerType.flags & ts.TypeFlags. ) {
                      console.log(' String literal argument ', arg.getFullText())
                    }
                    */
                    if (arg.compilerNode.kind == ts.SyntaxKind.ArrowFunction) {
                        console.log('--> Arrow function');
                        var arrowF = arg;
                        var returnType = arrowF.getReturnType().compilerType;
                        if (returnType.symbol) {
                            console.log('Returns Class ', returnType.symbol.escapedName);
                        }
                        // console.log(returnType.
                        // console.log(arrowF.getReturnType())
                    }
                    if (arg.getType().compilerType.flags & ts.TypeFlags.StringLiteral) {
                        console.log(' String literal argument ', arg.getFullText());
                    }
                    if (arg.getType().compilerType.flags & ts.TypeFlags.NumberLiteral) {
                        console.log(' Number literal argument ', arg.getFullText());
                    }
                });
            });
        });
        c.getMethods().forEach(function (m) {
            var methodName = m.getName();
            console.log(m.getName());
            // for all methods inside the function...
            rewriteFunctions(m.getFunctions());
            m.getDecorators().forEach(function (dec) {
                console.log('Decorator', dec.getFullName());
                // save the test 
                if (dec.getFullName() == 'TestFor') {
                    // collectTests.push( m )
                }
                dec.getArguments().forEach(function (arg) {
                    if (arg.getType().compilerType.flags & ts.TypeFlags.StringLiteral) {
                        console.log(' String literal argument ', arg.getFullText());
                    }
                    if (arg.getType().compilerType.flags & ts.TypeFlags.NumberLiteral) {
                        console.log(' Number literal argument ', arg.getFullText());
                    }
                });
            });
            m.getParameters().forEach(function (p) {
                console.log(' - ', p.getName());
                var t = p.getTypeNode();
                console.log(t.getKindName());
                var checker = project.getTypeChecker();
                var tp = t.getType().compilerType;
                if (tp.flags & ts.TypeFlags.Number) {
                    console.log('Number type');
                }
                if (tp.flags & ts.TypeFlags.String) {
                    console.log('String type');
                }
                if (tp.symbol) {
                    console.log('Class ', tp.symbol.escapedName);
                }
                p.getDecorators().forEach(function (dec) {
                    console.log('Param Decorator', dec.getFullName());
                    dec.getArguments().forEach(function (arg) {
                        if (arg.getType().compilerType.flags & ts.TypeFlags.StringLiteral) {
                            console.log(' String literal argument ', arg.getFullText());
                        }
                    });
                });
                // console.log( t.getType().compilerType.
            });
        });
    });
}
//# sourceMappingURL=index.js.map