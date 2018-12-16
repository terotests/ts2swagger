import * as express from "express";
import { AnyResponse, TreeModel } from "./models/model";
/**
 * Freeform test of the API comes here
 *
 * @swagger /src/swagger/sample.json
 * @title The title of the Doc
 * @service myserviceid
 * @endpoint /sometest/v1/
 * @version 1.0.1
 */
export declare class MyService {
    private req;
    private res;
    constructor(req: express.Request, res: express.Response);
    private getUserName;
    ping(message: string): Promise<string>;
    /**
     * @alias hello
     */
    sayHello(name: string): Promise<string>;
    getDevices(): Promise<Device[]>;
    /**
     * @method post
     */
    upload(): Promise<number>;
    testAnyResp(value: string): Promise<AnyResponse<string, any>>;
    recursiveTest(): Promise<TreeModel>;
}
/**
 * @model true
 */
export declare class Device {
    id: number;
    name: string;
    description?: string;
}
