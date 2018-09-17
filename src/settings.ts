
  
import Project, { JSDocTag, MethodDeclaration, ClassDeclaration, SourceFile, InterfaceDeclaration, ParameterDeclaration, FunctionDeclaration, PropertyDeclaration } from "ts-simple-ast";
import * as R from 'robowr'
import * as ProgrammerBase from './programmer/service'
import {
  getFunctionDoc, 
  JSDocParams, 
  getClassDoc, 
  isBoolean, 
  getTypePath,
  IFTypeDefinition,
  toSwaggerType,
  isSimpleType,
  getMethodDoc} from './utils'
import { Interface } from "mocha";
import * as utils from './utils'
import _ from 'lodash'
import * as ts from "typescript";

const path = require('path')

// code transpiler callbacks
export interface GenerationOptions {
  path: string
  isServiceClass: (ctx:InterfaceState) => boolean;
  initSwaggerForService: (ctx:InterfaceState) => any;
} 

export interface InterfaceState {

  wr?: R.CodeWriter

  // TODO: type declare the swagger documentation
  swagger?: any    

  // This could be the context of the writer...
  currentProject?: Project
  currentSourceFile?: SourceFile
  
  currentClass?: {
    JSDoc?: JSDocParams,
    declaration? : ClassDeclaration 
  }
  currentMethod?: {
    JSDoc?: JSDocParams,
    declaration?: MethodDeclaration, 
  }
  currentFunction?: {
    JSDoc?: JSDocParams,
    declaration?: MethodDeclaration, 
  }  

  // parameters given for this endpoint
  pathParams?: ParameterDeclaration[]
  queryParams?: ParameterDeclaration[]
  bodyParams?: ParameterDeclaration[] 

  paramTypes?: IFTypeDefinition[]
  returnType?: IFTypeDefinition
  isReturnTypeModel?: boolean

  is_post?:boolean
  httpMethod?:string
  apiPath?:string
  pathParamStr?:string
  clone? : ( args?:InterfaceState) => InterfaceState;
}