"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_morph_1 = require("ts-morph");
var ts = require("typescript");
var R = require("robowr");
// Collect specific classes from the filesystem
// 1. Initializing the project before the parsing
// 2. Reading out the classes from the project which will be used
// 3. Parsing the class information into the REST API endpoint structures
// 4. find out errors after the parsing
// 5. output the parsed data using writer library
describe("API generator tests", function () {
    test("Test of how to interpret classes in tests, not a libray test", function () {
        // 1. initialize project
        var project = new ts_morph_1.Project({});
        var sourceFile = project.createSourceFile("path/to/myNewFile.ts", "\n\nclass SomeClass<T> {\n\n}      \n\nclass TestClass {\n  x = true\n  async HelloWorld() {\n    return 'TestValue'\n  }\n  HelloWorld2() {\n    return 'TestValue'\n  }\n  async ReturnClass() {\n    if( Math.random() > 0.6 ) {\n      return new SomeClass<string>();\n    }\n    return new SomeClass<number>();\n  }\n  async ReturnClass2 () {\n    return { x: 10};\n  } \n  async ReturnClass3 () {\n    const obj = {x:20}\n    return obj;\n  }  \n}        \n    ");
        // 2. get classes from the assumed data
        sourceFile.getClasses().forEach(function (c) {
            c.getMethods().forEach(function (m) {
                // inspect the methods
                var rv = m.getReturnType();
                // console.log(rv);
                var tp = rv.compilerType;
                var rType = m.getSignature().getReturnType();
                if (tp.flags & ts.TypeFlags.String) {
                    console.log(m.getName(), "string");
                    return;
                }
                // TODO: return types are not correctly defined using
                // m.getReturnType()
                // - Walk the method and get the return declarations
                // - collect them into structures
                console.log("**", m.getName(), tp.symbol.escapedName), rType.getText();
                console.log(m.getReturnType().getText(m));
                // Type Arguments are the generic arguments for the
                // class like SomeClass<T> and T is instantiated
                rType.getTypeArguments().forEach(function (arg) {
                    console.log(m.getName(), " ARG text ", arg.getText());
                    if (arg.isUnion()) {
                        console.log(m.getName(), "has Union argument ");
                    }
                    if (arg.isString()) {
                        // Promise<String>
                        console.log(m.getName(), "has String argument ");
                    }
                    if (arg.isObject()) {
                        console.log(m.getName(), "Has Object Argument");
                        var argType = arg.getApparentType();
                        var str = argType.getSymbol().getEscapedName();
                        // Types string -> SomeClass
                        console.log("Apparent Type Str ", str);
                        //  SomeClass<number>
                        console.log("Apparent Type Test ", argType.getText());
                        // console.log('Apparent Type ', argType.)
                        arg.getTypeArguments().forEach(function (ta) {
                            console.log("^ and that has type arg too", ta.getText());
                        });
                    }
                    if (arg.isClass()) {
                        console.log(m.getName(), "Has Class Argument ", arg.getText());
                        arg.getTypeArguments().forEach(function (ta) {
                            console.log("^ and that has type arg too", ta.getText());
                        });
                    }
                });
                /*
                symbol: SymbolObject {
                  flags: 33554497,
                  escapedName: 'Promise',
                  checkFlags: 0,
                  declarations: [Array],
                  parent: undefined,
                  members: [Map],
                  valueDeclaration: [NodeObject],
                  exports: Map {},
                  declaredType: [TypeObject]
                },
        */
            });
        });
    });
    test("Test reading a single function", function () {
        // 1. initialize project
        var project = new ts_morph_1.Project({});
        var sourceFile = project.createSourceFile("path/to/myNewFile.ts", "\n// Could you just say all these functions are admin funcs?      \n\nfunction getCapitalizeName(name:string) {\n  return name.toUpperCase();\n}\n\n    ");
        console.log(sourceFile.getVariableDeclarations().map(function (f) { return f.getName(); }));
        var ctx = new R.Ctx();
        var fs = new R.CodeFileSystem();
        ctx.writer = fs.getFile("./builder/gen", "testout.ts").getWriter();
        ctx.data = {
            activeFunction: null,
            fns: []
        };
        sourceFile.getFunctions().map(function (f) {
            ctx.data.activeFunction = f;
            R.Walk(ctx, function (c) { return ["// function " + c.data.activeFunction.getName(),
                function (c) { return "/* " + c.data.activeFunction.getBody().print() + " */"; }
            ]; });
        });
        console.log(ctx.writer.getCode());
    });
});
/*
export const getTypePath = function(
  cType: any,
  current: string[] = []
): string[] {
  const tp = cType.compilerType;
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
    const res = [tp.symbol.escapedName];
    let end = [];
    if (cType.getTypeArguments().length > 0) {
      cType.getTypeArguments().forEach(arg => {
        end = [...end, ...getTypePath(arg)];
      });
    }
    return [...res, ...end];
  }
  return ["any"];
};
*/
//# sourceMappingURL=api.test.js.map