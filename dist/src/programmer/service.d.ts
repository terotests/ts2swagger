import * as R from "robowr";
import { MethodDeclaration, ClassDeclaration, Project, ParameterDeclaration } from "ts-simple-ast";
export declare const initSwagger: (wr: R.CodeWriter, service: any) => R.CodeWriter;
export declare const WriteEndpoint: (wr: R.CodeWriter, project: Project, clName: ClassDeclaration, method: MethodDeclaration, clientWriter?: R.CodeWriter) => R.CodeWriter;
export declare const createValidatorFor: (wr: R.CodeWriter, name: string, param: ParameterDeclaration) => string;
export declare const WriteClient: (wr: R.CodeWriter, project: Project, clName: ClassDeclaration, method: MethodDeclaration) => R.CodeWriter;
export declare const WriteClientEndpoint: (wr: R.CodeWriter, project: Project, clName: ClassDeclaration, method: MethodDeclaration) => R.CodeWriter;
