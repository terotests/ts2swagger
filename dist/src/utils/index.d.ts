import { TypeChecker, Project, FunctionDeclaration, MethodDeclaration, ClassDeclaration, InterfaceDeclaration, ParameterDeclaration } from "ts-simple-ast";
export declare class JSDocParams {
    comment: string;
    tags: {
        [key: string]: string;
    };
    params: {
        [key: string]: string;
    };
    hasTag(name: string): boolean;
    getTag(name: string): string;
}
export declare type InterfaceOrClass = ClassDeclaration | InterfaceDeclaration;
export declare const findClass: (project: Project, className: string) => ClassDeclaration;
export declare const findInterface: (project: Project, className: string) => InterfaceDeclaration;
export declare const findModel: (project: Project, className: string) => InterfaceOrClass;
export declare const getFunctionDoc: (method: MethodDeclaration | FunctionDeclaration) => JSDocParams;
export declare const getMethodDoc: (method: MethodDeclaration | FunctionDeclaration) => JSDocParams;
export declare const getClassDoc: (method: InterfaceOrClass) => JSDocParams;
export declare const getSwaggerType: (name: string, is_array?: boolean) => any;
export interface IFTypeDefinition {
    typePath?: string[];
    is_array?: boolean;
    lastType?: string;
    swaggerType?: string;
    modelClass?: ParameterDeclaration;
}
export declare const toSwaggerType: (cType: any) => IFTypeDefinition;
export declare const isSimpleType: (cType: any) => boolean;
export declare const isBoolean: (cType: any) => boolean;
export declare const getTypePath: (cType: any, current?: string[]) => string[];
export declare const getTypeName: (cType: any) => string;
export declare const getMethodReturnTypeName: (checker: TypeChecker, m: MethodDeclaration) => string;
