import { Device, AnyResponse, TreeModel } from "../../backend/models/model";
/**
 * API Client Could be written in here...
 *
 * @client myserviceid
 *
 */
export declare function N(axios: any): {
    ping(message: string): Promise<string>;
    sayHello(name: string): Promise<string>;
    getDevice(id: number, yesno: boolean, what: string): Promise<Device[]>;
    getDeviceSecond(id: number, yesno: boolean, what: string): Promise<Device[]>;
    upload(): Promise<number>;
    testAnyResp(value: string): Promise<AnyResponse<string, any>>;
    recursiveTest(): Promise<TreeModel>;
};
