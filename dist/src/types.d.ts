import { Project, JSDocTag, MethodDeclaration, ClassDeclaration, SourceFile, InterfaceDeclaration, ParameterDeclaration, FunctionDeclaration, PropertyDeclaration } from "ts-simple-ast";
import { JSDocParams } from './utils';
export declare type HTTPMethod = 'post' | 'get' | 'patch' | 'delete' | 'put';
export declare type ParemeterLocation = 'path' | 'query' | 'body';
export declare type SwaggerRef = {
    '$ref': string;
};
export declare type SwaggerSimpleType = {
    'type': string;
};
export declare type SwaggerArrayType = {
    'type': 'array';
    'items': (SwaggerRef | SwaggerSimpleType | SwaggerArrayType);
};
export declare type SwaggerType = SwaggerRef | SwaggerSimpleType | SwaggerArrayType;
export interface ServiceTag {
    name?: string;
    description?: string;
}
export interface ServiceModelProperty {
    name?: string;
    tsTypeName: string;
    JSDoc: JSDocTag;
    typePath?: string[];
    is_array?: boolean;
    innerType?: string;
    swaggerTypeDef?: SwaggerType;
    isModelType: boolean;
    parameterDeclaration?: ParameterDeclaration;
}
export interface ServiceModel {
    name: string;
    swaggerType?: string;
    properties: ServiceModelProperty[];
    propertyDeclaration: PropertyDeclaration;
}
export interface ServiceFunctionParameter {
    name: string;
    queryLocation: ParemeterLocation;
    JSDoc: JSDocTag;
    typePath?: string[];
    is_array?: boolean;
    innerType?: string;
    swaggerTypeDef?: SwaggerType;
    isModelType: boolean;
    parameterDeclaration?: ParameterDeclaration;
}
export interface ServiceFunction {
    name: string;
    httpMethod?: HTTPMethod;
    parameters: ServiceFunctionParameter[];
    returns: ServiceFunctionParameter;
    apiPath?: string;
    pathParamStr?: string;
    project?: Project;
    sourceFile?: SourceFile;
    classDeclaration?: ClassDeclaration;
    MethodDeclaration?: MethodDeclaration;
    functionDeclaration?: FunctionDeclaration;
    classDoc?: JSDocParams;
    methodDoc?: JSDocParams;
    functionDoc?: JSDocParams;
}
export interface ServiceDeclaration {
    name?: string;
    title?: string;
    termsOfService?: string;
    description?: string;
    port?: number;
    metadata: {
        [key: string]: string;
    };
    basePath?: string;
    functions: ServiceFunction[];
    models: ServiceModel[];
    schemes: string[];
    tags: ServiceTag[];
    project?: Project;
    sourceFile?: SourceFile;
    classDeclaration?: ClassDeclaration;
    classDoc?: JSDocParams;
    intefaceDeclaration?: InterfaceDeclaration;
    interfaceDoc?: JSDocParams;
}
