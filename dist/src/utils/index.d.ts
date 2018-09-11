import { TypeChecker, Project, FunctionDeclaration, MethodDeclaration, ClassDeclaration } from "ts-simple-ast";
export declare const findModel: (project: Project, className: string) => ClassDeclaration;
export declare class JSDocParams {
    comment: string;
    tags: {
        [key: string]: string;
    };
    params: {
        [key: string]: string;
    };
}
export declare const getFunctionDoc: (method: FunctionDeclaration) => JSDocParams;
export declare const getMethodDoc: (method: MethodDeclaration) => JSDocParams;
export declare const getClassDoc: (method: ClassDeclaration) => JSDocParams;
export declare const getSwaggerType: (name: string, is_array?: boolean) => any;
export declare const isSimpleType: (cType: any) => boolean;
export declare const getTypePath: (cType: any, current?: string[]) => string[];
export declare const getTypeName: (cType: any) => string;
export declare const getMethodReturnTypeName: (checker: TypeChecker, m: MethodDeclaration) => string;
