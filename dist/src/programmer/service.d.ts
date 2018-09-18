import * as R from 'robowr';
import { MethodDeclaration, ClassDeclaration, Project, ParameterDeclaration } from 'ts-simple-ast';
export interface EndpointParams {
    httpMethod: string;
    basePath: string;
    apiPath: string;
    pathParams: ParameterDeclaration[];
    queryParams: ParameterDeclaration[];
    bodyParams: ParameterDeclaration[];
}
export declare const initSwagger: (wr: R.CodeWriter, service: any) => R.CodeWriter;
export declare const WriteEndpoint: (wr: R.CodeWriter, project: Project, clName: ClassDeclaration, method: MethodDeclaration) => R.CodeWriter;
export declare const WriteClientEndpoint: (wr: R.CodeWriter, project: Project, clName: ClassDeclaration, method: MethodDeclaration) => R.CodeWriter;
