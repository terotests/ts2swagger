import { SomeReturnValue, TestUser, Device, CreateDevice, CreateUser } from '../../backend/models/model';
/**
 * API Client Could be written in here...
 *
 * @client service1
 *
 */
export declare function N(axios: any): {
    putUser(id: string, overwrite: boolean, user: TestUser): Promise<TestUser>;
    getUser(id: string): Promise<TestUser>;
    searchByKeyword(searchKeyword: string): Promise<string[]>;
    getUserFriends(userId: number, friendId: number, filter: string): Promise<TestUser[]>;
    deleteUser(id: string): Promise<TestUser>;
    newfn(s: string): Promise<string>;
    getDevices(id: string): Promise<Device[]>;
    allUsers(): Promise<TestUser[]>;
    users(id: string): Promise<TestUser[]>;
    createUser(u: CreateUser): Promise<TestUser>;
    setDeviceData(createNewDevice: CreateDevice): Promise<SomeReturnValue>;
    obj(v: number): Promise<SomeReturnValue>;
    test3(id: number): Promise<SomeReturnValue>;
    HelloWorld(name: string): Promise<string>;
    hello(name: string): Promise<string>;
    custom(name: string): Promise<string>;
    test(): Promise<string>;
};
