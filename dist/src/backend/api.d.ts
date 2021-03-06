import { SomeReturnValue, TestUser, Device, CreateDevice, CreateUser } from "./models/model";
import * as express from "express";
/**
 * APIn kuvaus jne.
 *
 * @swagger /src/swagger/server2.json
 * @title JeeJee
 * @service service2
 * @endpoint /sometest/v1/
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
 * @endpoint /sometest2/v1/
 * @version 1.0.1
 *
 */
export declare class ServerInterface {
    private req;
    private res;
    constructor(req: express.Request, res: express.Response);
    /**
     *
     * @alias user
     * @method put
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    putUser(id: string, overwrite: boolean, user: TestUser): Promise<TestUser>;
    /**
     *
     * @alias users
     * @method get
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    getUser(id: string): Promise<TestUser>;
    /**
     * Etsi dokumentaatiosta tietoja hakusanalla
     * @method get
     * @alias searchByKeyword
     * @query searchKeyword
     * @tag document
     * @tagdescription
     */
    searchByKeyword(searchKeyword: string): Promise<string[]>;
    /**
     *
     * @alias users/friends
     * @method get
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    getUserFriends(userId: number, friendId: number, filter?: string): Promise<TestUser[]>;
    /**
     *
     * @alias user
     * @method delete
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    deleteUser(id: string): Promise<TestUser>;
    newfn(s: string): Promise<string>;
    /**
     * List all devices in the system
     * @param {string} id here could be the documentation of the ID value
     */
    getDevices(id: number): Promise<Device[]>;
    allUsers(): Promise<TestUser[]>;
    /**
     * Fetch all users
     * @param id of course the user id
     */
    users(id: string): Promise<TestUser[]>;
    createUser(u: CreateUser): Promise<TestUser>;
    /**
     * Will set the device data
     * @description ok, looks good
     */
    setDeviceData(createNewDevice: CreateDevice): Promise<SomeReturnValue>;
    obj(v: number): Promise<SomeReturnValue>;
    /**
     * @nogenerate true
     */
    test2(id: number): Promise<SomeReturnValue>;
    /**
     * Foobar...
     * @param id
     */
    test3(id: number): Promise<SomeReturnValue>;
    HelloWorld(name: string): Promise<string>;
    /**
     * Async function returning stuff...
     * @error 404 ErrorNotFound
     */
    hello(name: string): Promise<string>;
    /**
     * Custom endpoint behaviour, not well defined at this point
     * @param name
     * @custom true
     */
    custom(name: string): Promise<string>;
    test(): Promise<string>;
}
