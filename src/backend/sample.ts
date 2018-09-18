import * as express from 'express'
const app = express()

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
  constructor( private req:express.Request, private res: express.Response) {}
  ping(message:string) : string {
    return `you sent ${message}`
  } 
  /**
   * @alias hello
   */
  async sayHello(name:string) : Promise<string> {
    if(name==='foo') throw { errorCode:404, message:'User not found'}
    return `Hello ${name}!!!`
  }   
}