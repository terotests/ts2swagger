

// Remember to import the model declararations etc. for the
// compiles interface class over here...

import { 
  SomeReturnValue, 
  TestUser, 
  Device, 
  CreateDevice, 
  CreateUser,
  AnyResponse
} from '../../backend/models/model'

/** 
 * API Client Could be written in here...
 * 
 * @client myserviceid
 * 
 */
export function N(axios:any) {
  return new class MyService {
    // client for endpoint ping
    async ping(message:string) : Promise<string> {
      return (await axios.get(`/sometest/v1/ping/${message}/`,{params:{}})).data;
    }
    // client for endpoint sayHello
    async sayHello(name:string) : Promise<string> {
      return (await axios.get(`/sometest/v1/hello/${name}/`,{params:{}})).data;
    }
    // client for endpoint getDevices
    async getDevices() : Promise<Device[]> {
      return (await axios.get(`/sometest/v1/getDevices/`,{params:{}})).data;
    }
    // client for endpoint upload
    async upload() : Promise<number> {
      return (await axios.post(`/sometest/v1/upload/`,)).data;
    }
    // client for endpoint testAnyResp
    async testAnyResp(value:string) : Promise<AnyResponse<string, any>> {
      return (await axios.get(`/sometest/v1/testAnyResp/${value}/`,{params:{}})).data;
    }
    // client for endpoint recursiveTest
    async recursiveTest() : Promise<TreeModel> {
      return (await axios.get(`/sometest/v1/recursiveTest/`,{params:{}})).data;
    }
  }
}

