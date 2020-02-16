import { Device, AnyResponse } from '../../backend/models/model';
/**
 * API Client Could be written in here...
 *
 * @client myserviceid
 *
 */
export declare function N(axios: any): {
    ping(message: string): Promise<string>;
    test2(name: string): Promise<string>;
    sayHello(name: string): Promise<string>;
    getDevices(): Promise<Device[]>;
    upload(): Promise<number>;
    testAnyResp(value: string): Promise<AnyResponse<string, any>>;
};
