import { expect } from "chai";
import { Project, VariableDeclaration, FunctionDeclaration } from "ts-morph";
import * as ts from "typescript";
import * as R from 'robowr'

// Collect specific classes from the filesystem

// 1. Initializing the project before the parsing
// 2. Reading out the classes from the project which will be used
// 3. Parsing the class information into the REST API endpoint structures
// 4. find out errors after the parsing
// 5. output the parsed data using writer library

describe("API generator tests", () => { 

  test("Test of how to interpret classes in tests, not a libray test", () => {
    // 1. initialize project
    const project = new Project({});
    const sourceFile = project.createSourceFile(
      "path/to/myNewFile.ts",
      `

class SomeClass<T> {

}      

class TestClass {
  x = true
  async HelloWorld() {
    return 'TestValue'
  }
  HelloWorld2() {
    return 'TestValue'
  }
  async ReturnClass() {
    if( Math.random() > 0.6 ) {
      return new SomeClass<string>();
    }
    return new SomeClass<number>();
  }
  async ReturnClass2 () {
    return { x: 10};
  } 
  async ReturnClass3 () {
    const obj = {x:20}
    return obj;
  }  
}        
    `
    );

    // 2. get classes from the assumed data
    sourceFile.getClasses().forEach(c => {
      c.getMethods().forEach(m => {
        // inspect the methods
        const rv = m.getReturnType();
        // console.log(rv);

        const tp = rv.compilerType;
        const rType = m.getSignature().getReturnType();

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
        rType.getTypeArguments().forEach(arg => {
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
            const argType = arg.getApparentType();
            const str = argType.getSymbol().getEscapedName();

            // Types string -> SomeClass
            console.log("Apparent Type Str ", str);
            //  SomeClass<number>
            console.log("Apparent Type Test ", argType.getText());
            // console.log('Apparent Type ', argType.)
            arg.getTypeArguments().forEach(ta => {
              console.log("^ and that has type arg too", ta.getText());
            });
          }
          if (arg.isClass()) {
            console.log(m.getName(), "Has Class Argument ", arg.getText());
            arg.getTypeArguments().forEach(ta => {
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


  test("Test reading a single function", () => {
    // 1. initialize project
    const project = new Project({});
    const sourceFile = project.createSourceFile(
      "path/to/myNewFile.ts",
      `
// Could you just say all these functions are admin funcs?      

function getCapitalizeName(name:string) {
  return name.toUpperCase();
}

    `
    );

    console.log(sourceFile.getVariableDeclarations().map( f => f.getName()))

    const ctx = new R.Ctx<{
      activeFunction:FunctionDeclaration,
      fns:FunctionDeclaration[]
    }>();

    const fs = new R.CodeFileSystem();
    ctx.writer = fs.getFile("./builder/gen", "testout.ts").getWriter();
    ctx.data = {
      activeFunction: null,
      fns:[]
    }
    
    sourceFile.getFunctions().map( f => {
      ctx.data.activeFunction = f 
      R.Walk(ctx, c => [`// function ${c.data.activeFunction!.getName()}`, 
        c => `/* ${c.data.activeFunction!.getBody().print()} */`
      ])
    })

    console.log(ctx.writer.getCode())


  })   
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
