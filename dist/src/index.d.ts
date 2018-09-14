import Project, { MethodDeclaration, ClassDeclaration, SourceFile } from "ts-simple-ast";
import { JSDocParams } from './utils';
export interface GenerationOptions {
    path: string;
}
export declare class InterfaceState {
    swagger?: any;
    currentProject?: Project;
    currentSourceFile?: SourceFile;
    currentClass?: {
        JSDoc?: JSDocParams;
        declaration?: ClassDeclaration;
    };
    currentMethod?: {
        JSDoc?: JSDocParams;
        declaration: MethodDeclaration;
    };
    currentFunction?: {
        JSDoc?: JSDocParams;
        declaration: MethodDeclaration;
    };
}
export declare function createProject(settings: GenerationOptions): Promise<void>;
