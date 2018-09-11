import { SomeReturnValue, TestUser, Device, CreateDevice, CreateUser } from './models/model';
/**
 * APIn kuvaus jne.
 *
 * @swagger /src/swagger/server2.json
 * @title JeeJee
 * @service service2
 * @endpoint /v1/
 * @version 1.0.1
 */
export declare class Server2 {
    hello(id: string): string;
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
export declare class ServerInterface {
    /**
     *
     * @alias user
     * @method put
     * @param id set user to some value
     * @param user
     */
    putUser(id: string, user: TestUser): TestUser;
    newfn(s: string): string;
    /**
     * List all devices in the system
     * @param {string} id here could be the documentation of the ID value
     */
    getDevices(id: string): Device[];
    allUsers(): TestUser[];
    /**
     * Fetch all users
     * @param id of course the user id
     */
    users(id: string): TestUser[];
    createUser(u: CreateUser): number;
    /**
     * Will set the device data
     * @description ok, looks good
     */
    setDeviceData(createNewDevice: CreateDevice): SomeReturnValue;
    obj(v: number): SomeReturnValue;
    /**
     * @nogenerate true
     */
    test2(id: number): SomeReturnValue;
    test3(id: number): SomeReturnValue;
    HelloWorld(name: string): string;
    hello(name: string): string;
}
