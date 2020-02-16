import * as R from "robowr";
import { MethodDeclaration, ClassDeclaration, Project } from "ts-morph";
export declare const initSwagger: (wr: R.CodeWriter, service: any) => R.CodeWriter;
export declare const WriteEndpoint: (wr: R.CodeWriter, project: Project, clName: ClassDeclaration, method: MethodDeclaration, clientWriter?: R.CodeWriter) => R.CodeWriter;
export declare const WriteClient: (wr: R.CodeWriter, project: Project, clName: ClassDeclaration, method: MethodDeclaration) => R.CodeWriter;
export declare const WriteClientEndpoint: (wr: R.CodeWriter, project: Project, clName: ClassDeclaration, method: MethodDeclaration) => R.CodeWriter;
