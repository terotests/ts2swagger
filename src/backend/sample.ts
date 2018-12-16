import * as express from "express";
import fs from "fs";
import { AnyResponse, TreeModel } from "./models/model";
const app = express();
/**
 * Freeform test of the API comes here
 *
 * @swagger /src/swagger/sample.json
 * @title The title of the Doc
 * @service myserviceid
 * @endpoint /sometest/v1/
 * @version 1.0.1
 */

export class MyService {
  constructor(private req: express.Request, private res: express.Response) {}

  private getUserName() {}

  async ping(message: string): Promise<string> {
    return `you sent ${message}`;
  }
  /**
   * @alias hello
   */
  async sayHello(name: string): Promise<string> {
    if (name === "foo") throw { errorCode: 404, message: "User not found" };
    return `Hello ${name}!!!`;
  }

  async getDevices(): Promise<Device[]> {
    return [{ id: 1, name: "iPhone" }];
  }

  /**
   * @method post
   */
  async upload(): Promise<number> {
    // output results to some file...
    // this.req.pipe( )
    this.req.pipe(fs.createWriteStream(__dirname + "/uploadedFile.bin"));
    return 0;
  }

  async testAnyResp(value: string): Promise<AnyResponse<string, any>> {
    // This example does not work properly
    try {
      if (value === "error") throw { mistake: true };
      return new AnyResponse("OK", "");
    } catch (e) {
      return new AnyResponse(null, e);
    }
  }

  async recursiveTest(): Promise<TreeModel> {
    return {
      name: "OK",
      children: [{ name: "Child", children: [] }]
    };
  }
}

/**
 * @model true
 */
export class Device {
  id: number;
  name: string;
  description?: string; // optional
}
