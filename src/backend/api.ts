
import { SomeReturnValue, TestUser, Device, CreateDevice, CreateUser } from './models/model'

/** 
 * APIn kuvaus jne.
 * 
 * @swagger /src/swagger/server2.json
 * @title JeeJee
 * @service service2 
 * @endpoint /v1/
 * @version 1.0.1  
 */
export class Server2 {
  hello(id:string) : string {
    return 'hi there!'
  } 
}

/** 
 * APIn kuvaus jne.
 * 
 * @swagger /src/swagger/api.json
 * @title First service
 * @service service1
 * @endpoint /v1/
 * @version 1.0.1
 * 
 */
export class ServerInterface {

  /**
   * 
   * @alias user
   * @method put
   * @param id set user to some value
   * @param user 
   * @tag user
   * @tagdescription System users
   */
  putUser(id:string, overwrite:boolean, user:TestUser) : TestUser {
    console.log('overwrite: ', overwrite)
    if( overwrite ) {
      console.log('TRUE')
    } else {
      console.log('FALSE')
    }
    return {name:'foobar'}
  }

  /**
   * 
   * @alias users
   * @method get
   * @param id set user to some value
   * @param user 
   * @tag user
   * @tagdescription System users
   */
  getUser(id:string) : TestUser {
    return {name:'foobar'}
  }  

  /**
   * Etsi dokumentaatiosta tietoja hakusanalla
   * @method get
   * @alias searchByKeyword
   * @query searchKeyword
   * @tag document
   * @tagdescription 
   */
  searchByKeyword(searchKeyword:string) : string[] {
    return ['a', 'b']
  }    

  /**
   * 
   * @alias users/friends
   * @method get
   * @param id set user to some value
   * @param user 
   * @tag user
   * @tagdescription System users
   */
  getUserFriends(userId:number, friendId:number, filter?:string) : TestUser[] {
    console.log('filter: ', filter)
    return [{
      name : 'foobar'
    }]
  }    

  /**
   * 
   * @alias user
   * @method delete
   * @param id set user to some value
   * @param user 
   * @tag user
   * @tagdescription System users
   */
  deleteUser(id:string) : TestUser {
    return {name:'foobar'}
  }   

  newfn(s:string) {
    return 'Simple string answer'
  }

  /**
   * List all devices in the system
   * @param {string} id here could be the documentation of the ID value
   */
  getDevices(id:string) : Device[] {
    return [
      {id:1, name:'MacBook Pro'},
      {id:2, name:'iPhone'},
      {id:3, name:'Huawei'},
    ]
  }  
  
  allUsers() : TestUser[] {
    return [
      {name:'First User'},
      {name:'Second User'},
    ]
  }
  /**
   * Fetch all users
   * @param id of course the user id
   */
  users(id:string) : TestUser[] {
    return [
      {name:'First User'},
      {name:'Second User'},
    ]
  }

  createUser( u: CreateUser) : number {
    return 100
  }

  /**
   * Will set the device data
   * @description ok, looks good
   */
  setDeviceData( createNewDevice:CreateDevice) : SomeReturnValue {
    const value = new SomeReturnValue()
    value.response = createNewDevice.description + ' OK '
    return value
  }

  obj(v:number) : SomeReturnValue {

    // Test inserting function code inside some file
    function compilerInsertTest()  {
        for( let i=0; i< 10; i++) {
            console.log(i);
        }
        return 1450;
    }    
    // Then the client can use that computer generated code...
    const value = new SomeReturnValue()
    value.myValue = compilerInsertTest()
    return value
  }

  /**
   * @nogenerate true
   */
  test2(id:number) : SomeReturnValue  {
    if(id > 12) {
      throw new Error('Invalid ID number')
    }
    const value = new SomeReturnValue()
    value.myValue = 12345
    return value
  } 
  
  /**
   * Foobar...
   * @param id 
   */
  async test3(id:number) : Promise<SomeReturnValue>  {
    if(id > 12) {
      throw new Error('Invalid ID number')
    }
    const value = new SomeReturnValue()
    value.myValue = 12345
    return value
  }   

  HelloWorld(name:string) : string {
    return `Hello World ${name}`
  }

  /**
   * Async function returning stuff...
   */
  async hello(name:string) : Promise<string> {
    return `Hello ${name}!!!`
  }  
}

