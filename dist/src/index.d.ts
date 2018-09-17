import Project, { MethodDeclaration, ClassDeclaration, SourceFile, InterfaceDeclaration, ParameterDeclaration } from "ts-simple-ast";
import * as R from 'robowr';
import { JSDocParams, IFTypeDefinition } from './utils';
import * as utils from './utils';
export interface GenerationOptions {
    path: string;
    isServiceClass: (ctx: InterfaceState) => boolean;
    initSwaggerForService: (ctx: InterfaceState) => any;
}
export interface InterfaceState {
    wr?: R.CodeWriter;
    swagger?: any;
    currentProject?: Project;
    currentSourceFile?: SourceFile;
    currentClass?: {
        JSDoc?: JSDocParams;
        declaration?: ClassDeclaration;
    };
    currentMethod?: {
        JSDoc?: JSDocParams;
        declaration?: MethodDeclaration;
    };
    currentFunction?: {
        JSDoc?: JSDocParams;
        declaration?: MethodDeclaration;
    };
    pathParams?: ParameterDeclaration[];
    queryParams?: ParameterDeclaration[];
    bodyParams?: ParameterDeclaration[];
    paramTypes?: IFTypeDefinition[];
    returnType?: IFTypeDefinition;
    isReturnTypeModel?: boolean;
    is_post?: boolean;
    httpMethod?: string;
    apiPath?: string;
    pathParamStr?: string;
    clone?: (args?: InterfaceState) => InterfaceState;
}
export declare class CInterfaceState {
    wr?: R.CodeWriter;
    swagger?: any;
    currentProject?: Project;
    currentSourceFile?: SourceFile;
    currentClass?: {
        JSDoc?: JSDocParams;
        declaration?: ClassDeclaration;
    };
    currentMethod?: {
        JSDoc?: JSDocParams;
        declaration?: MethodDeclaration;
    };
    currentFunction?: {
        JSDoc?: JSDocParams;
        declaration?: MethodDeclaration;
    };
    pathParams?: ParameterDeclaration[];
    queryParams?: ParameterDeclaration[];
    bodyParams?: ParameterDeclaration[];
    paramTypes?: IFTypeDefinition[];
    returnType?: IFTypeDefinition;
    isReturnTypeModel?: boolean;
    is_post?: boolean;
    httpMethod?: string;
    apiPath?: string;
    pathParamStr?: string;
    constructor();
    clone(args?: InterfaceState): InterfaceState;
}
export declare const isServiceClass: (ctx: InterfaceState) => boolean;
export declare const initSwaggerForService: (ctx: InterfaceState) => {
    "swagger": string;
    "basePath": string;
    "paths": {};
    "definitions": {};
    "schemes": string[];
    "info": {
        "version": string;
        "title": string;
        "description": string;
        "termsOfService": string;
    };
    tags: any[];
};
export declare const isModelClass: (ctx: InterfaceState) => boolean;
export declare type InterfaceOrClass = ClassDeclaration | InterfaceDeclaration;
export declare const findModel: (ctx: InterfaceState, className: string) => utils.InterfaceOrClass;
export declare const CollectEndpointParams: (ctx: InterfaceState) => InterfaceState;
export declare function createProject(settings: GenerationOptions): Promise<void>;
