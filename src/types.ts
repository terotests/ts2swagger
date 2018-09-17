
import { 
  Project, 
  JSDocTag, 
  MethodDeclaration, 
  ClassDeclaration, 
  SourceFile, 
  InterfaceDeclaration, 
  ParameterDeclaration, 
  FunctionDeclaration, 
  PropertyDeclaration, 
  JSDoc} from "ts-simple-ast";

import {
  JSDocParams,
} from './utils'  

import * as Swagger from './OpenAPI3'

// Not good, because does not guard against all polymorphic features...
export type HTTPMethod = 'post' | 'get' | 'patch' | 'delete' | 'put'
export type ParemeterLocation = 'path' | 'query' | 'body'

export interface ServiceTag { 
  name?: string 
  description?: string
}

export interface ServiceModelProperty {
  /*
  name?: string 
  tsTypeName: string
  typePath?: string[]   // like ['Array', 'string']
  is_array?: boolean    
  innerType?: string    // for example Item in array of items
  isModelType: boolean
  */
  name: string 
  schema?: Swagger.SwaggerSchema  // typename in swagger
  JSDoc: JSDocTag
  ASTParameterDeclaration?: ParameterDeclaration
}

export interface ServiceModel {
  name: string 
  swagger: Swagger.SwaggerSchema
  JSDoc: JSDoc
  properties: {[key:string]:ServiceModelProperty[]}
  ASTPropertyDeclaration: PropertyDeclaration
}

export interface ServiceFunctionParameter {
  name: string 
  swagger: Swagger.SwaggerParameterDefinition
  JSDoc: JSDoc
  ASTParameterDeclaration?: ParameterDeclaration
}

export interface ServiceFunction {

  name: string
  swagger: Swagger.SwaggerOperation  
  httpMethod?: HTTPMethod
  parameters: ServiceFunctionParameter[]
  returns: ServiceFunctionParameter

  apiPath?:string
  pathParamStr?:string

  ASTClassDeclaration?: ClassDeclaration
  ASTMethodDeclaration?: MethodDeclaration
  
  // should these be in separate entity ? 
  // AST ->
  // Doc -> 
  project?: Project
  sourceFile?: SourceFile
  classDeclaration? : ClassDeclaration
  MethodDeclaration? : MethodDeclaration
  functionDeclaration? : FunctionDeclaration
  classDoc?: JSDocParams
  methodDoc?: JSDocParams
  functionDoc?: JSDocParams
}

export interface ServiceDeclaration {  

  name?: string
  title?: string
  termsOfService?: string
  description?: string
  port?: number
    
  metadata: {[key:string]:string}
  basePath? :string
  functions: ServiceFunction[]
  models :ServiceModel[]
  schemes: string[]
  tags: ServiceTag[] 

  // compiler AST specific metadata
  
  project?: Project
  sourceFile?: SourceFile
  classDeclaration? : ClassDeclaration
  classDoc?: JSDocParams
  intefaceDeclaration? : InterfaceDeclaration
  interfaceDoc?: JSDocParams
}
