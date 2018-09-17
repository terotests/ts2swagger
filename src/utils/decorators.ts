/**
 * Example decorators which could be made to make the system more type-safe
 * These are from TSOA -library
 */

import * as Swagger from '../OpenAPI3'

export type MethodDecoratorReturn = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export type ClassDecoratorReturn = (constructor: any) => void;
export type ParameterDecoratorReturn = (target: object, propertyKey: string | symbol, parameterIndex: number) => void;

export type HTTPRequestMethod = 'get' | 'post' | 'patch' | 'delete' | 'put' | 'head' | 'options'
export type BinaryEncodingType = 'base64' | 'binary'

/**
 * query parameter position, for example @in('body')
 * @param pos 
 */
export function In(pos?: Swagger.SwaggerParameterLocation): ParameterDecoratorReturn {
  return (ParameterDecoratorReturn) => { return; };
}

/**
 * The parameter is Request parameter
 */
export function Request(): ParameterDecoratorReturn {
  return (ParameterDecoratorReturn) => { return; };
}

/**
 * For file uploads
 */
export function Binary(encoding:BinaryEncodingType): ParameterDecoratorReturn {
  return (ParameterDecoratorReturn) => { return; };
}

/**
 * The parameter is transferred in method body
 */
export function Body(): ParameterDecoratorReturn {
  return (ParameterDecoratorReturn) => { return; };
}

/**
 * Name of the path parameter
 * @param name name for the path parameter
 */
export function Path(name?: string): ParameterDecoratorReturn {
  return (ParameterDecoratorReturn) => { return; };
}

/**
 * The parameter is query parameter
 * @param name optional name for the parameter
 */
export function Query(name?: string): ParameterDecoratorReturn {
  return (ParameterDecoratorReturn) => { return; };
}

/**
 * Parameter in the header
 * @param name optional name for the header parameter
 */
export function Header(name?: string): ParameterDecoratorReturn {
  return (ParameterDecoratorReturn) => { return; };
}

/**
 * Method decorator
 */
export function HTTP(value?: HTTPRequestMethod): MethodDecoratorReturn {
  return () => { return; };
}

/**
 * To be defined later
 */
export function Security(scheme:Swagger.SwaggerSecuritySchemeType): MethodDecoratorReturn {
  return () => { return; };
}

/**
 * Define JWT token auth using
 * Authorization: Bearer <token>
 */
export function JWT(name?:string): MethodDecoratorReturn {
  return () => { return; };
}

/**
 * Generate example result value
 * @param exampleModel 
 */
export function Example<T>(exampleModel: T): MethodDecoratorReturn {
  return () => { return; };
}


