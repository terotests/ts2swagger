/**
 * @model true
 */
export declare class SomeKeyWord {
    name: string;
}
/**
 * @model true
 */
export declare class SomeReturnValue {
    myValue: number;
    response: string;
    someList: string[];
    keys: SomeKeyWord[];
}
/**
 * @model true
 */
export declare class CreateDevice {
    name: string;
    description: string;
}
/**
 * @model true
 */
export declare class CreateUser {
    /** users name is here... */
    name: string;
    /** users address, not ginve with any specificity */
    address: string;
    /** ---> Age of the user... */
    age: number;
}
/**
 * @model true
 */
export interface TestUser {
    name: string;
    isHidden?: boolean;
}
/**
 * @model true
 */
export declare class Device {
    id: number;
    name: string;
}
