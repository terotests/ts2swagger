/**
 * Example decorators which could be made to make the system more type-safe
 */
export declare type ParameterDecoratorReturn = (target: object, propertyKey: string | symbol, parameterIndex: number) => void;
export declare type PositionType = 'body' | 'query' | 'path';
export declare function Position(pos?: PositionType): ParameterDecoratorReturn;
export declare function Query(name?: string): ParameterDecoratorReturn;
