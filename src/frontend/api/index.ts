

// Remember to import the model declararations etc. for the
// compiles interface class over here...

import { 
  SomeReturnValue, 
  TestUser, 
  Device, 
  CreateDevice, 
  CreateUser 
} from '../../backend/models/model'

/** 
 * API Client Could be written in here...
 * 
 * @client service1
 * 
 */
export function N(axios:any) {
  return new class ServerInterface {
    // client for endpoint putUser
    async putUser(id:string, overwrite:boolean, user:TestUser) : Promise<TestUser> {
      return (await axios.put(`/sometest2/v1/user/${id}/`,user)).data;
    }
    // client for endpoint getUser
    async getUser(id:string) : Promise<TestUser> {
      return (await axios.get(`/sometest2/v1/users/${id}/`,{params:{}})).data;
    }
    // client for endpoint searchByKeyword
    async searchByKeyword(searchKeyword:string) : Promise<string[]> {
      return (await axios.get(`/sometest2/v1/searchByKeyword/`,{params:{searchKeyword}})).data;
    }
    // client for endpoint getUserFriends
    async getUserFriends(userId:number, friendId:number, filter:string) : Promise<TestUser[]> {
      return (await axios.get(`/sometest2/v1/users/${userId}/friends/${friendId}/`,{params:{filter}})).data;
    }
    // client for endpoint deleteUser
    async deleteUser(id:string) : Promise<TestUser> {
      return (await axios.delete(`/sometest2/v1/user/${id}/`,{params:{}})).data;
    }
    // client for endpoint newfn
    async newfn(s:string) : Promise<string> {
      return (await axios.get(`/sometest2/v1/newfn/${s}/`,{params:{}})).data;
    }
    // client for endpoint getDevices
    async getDevices(id:string) : Promise<Device[]> {
      return (await axios.get(`/sometest2/v1/getDevices/${id}/`,{params:{}})).data;
    }
    // client for endpoint allUsers
    async allUsers() : Promise<TestUser[]> {
      return (await axios.get(`/sometest2/v1/allUsers/`,{params:{}})).data;
    }
    // client for endpoint users
    async users(id:string) : Promise<TestUser[]> {
      return (await axios.get(`/sometest2/v1/users/${id}/`,{params:{}})).data;
    }
    // client for endpoint createUser
    async createUser(u:CreateUser) : Promise<TestUser> {
      return (await axios.post(`/sometest2/v1/createUser/`,u)).data;
    }
    // client for endpoint setDeviceData
    async setDeviceData(createNewDevice:CreateDevice) : Promise<SomeReturnValue> {
      return (await axios.post(`/sometest2/v1/setDeviceData/`,createNewDevice)).data;
    }
    // client for endpoint obj
    async obj(v:number) : Promise<SomeReturnValue> {
      return (await axios.get(`/sometest2/v1/obj/${v}/`,{params:{}})).data;
    }
    // client for endpoint test3
    async test3(id:number) : Promise<SomeReturnValue> {
      return (await axios.get(`/sometest2/v1/test3/${id}/`,{params:{}})).data;
    }
    // client for endpoint HelloWorld
    async HelloWorld(name:string) : Promise<string> {
      return (await axios.get(`/sometest2/v1/HelloWorld/${name}/`,{params:{}})).data;
    }
    // client for endpoint hello
    async hello(name:string) : Promise<string> {
      return (await axios.get(`/sometest2/v1/hello/${name}/`,{params:{}})).data;
    }
    // client for endpoint custom
    async custom(name:string) : Promise<string> {
      return (await axios.get(`/sometest2/v1/custom/${name}/`,{params:{}})).data;
    }
    // client for endpoint test
    async test() : Promise<string> {
      return (await axios.get(`/sometest2/v1/test/`,{params:{}})).data;
    }
  }
}

