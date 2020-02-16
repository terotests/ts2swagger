import { expect } from "chai";
import { Project, VariableDeclaration, FunctionDeclaration } from "ts-morph";
import * as ts from "typescript";
import * as R from 'robowr'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import { OpenAPI3, SwaggerSchema } from "../src/OpenAPI3";
import * as API3 from "../src/OpenAPI3";
import * as OA from 'openapi3-ts';

// Notice, JSON schema to typescript could be used
// 1. https://github.com/bcherny/json-schema-to-typescript#readme

type TestType = API3.SwaggerOneOf | API3.SwaggerAllOf | API3.SwaggerObjectDefinition;

describe("Test YAML parser", () => { 

  test("Test of how to interpret classes in tests, not a libray test", async () => {

    const fileContents = fs.readFileSync('./test/openapi/petstore.yaml', 'utf8');
    const api:API3.OpenAPI3 = yaml.safeLoad(fileContents);    
    const ctx = R.Walk( R.CreateContext(api), ctx => {
      // converting the type name
      const getTypeName = ( schema:SwaggerSchema) => {
        if(API3.isObject(schema)) {
          return 'Object'
        }
        if(API3.isString(schema)) {
          return 'string'
        }
        if(API3.isInteger(schema)) {
          return 'number'
        }
        if(API3.isBoolean(schema)) {
          return 'boolean'
        }
        
        return 'any'
      }

      const getProperties = (s:SwaggerSchema) => {
        if(API3.isRef(s)) {
          // #/components/schemas/NewPet
          const name = s.$ref.split('/').pop()
          // NOTE: see
          // https://swagger.io/docs/specification/using-ref/
          const n = ctx.data.components!.schemas![name]
          console.log('Reference to ', n)
          return getProperties( n )
        }
        if( API3.isAllOf(s)) {
          return [...s.allOf!.map( getProperties )]
        }
        if(API3.isObject(s)) {
          return [Object.keys(s.properties).map( key => {
            return [`${key}:${ getTypeName(s.properties![key])}`]
          })]
        } 
        return []
      }

      const schemas = ctx.data.components!.schemas!
      return Object.keys( schemas ).map( name => {
        const s = schemas[name];
        return [
          `class ${name} {`,
            ctx => getProperties(s),          
          '}'
        ]
      }
      )
    })   
    console.log(ctx.writer.getCode())
});


})

