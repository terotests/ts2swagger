"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./models/model");
/**
 * APIn kuvaus jne.
 *
 * @swagger /src/swagger/server2.json
 * @title JeeJee
 * @service service2
 * @endpoint /v1/
 * @version 1.0.1
 */
var Server2 = /** @class */ (function () {
    function Server2() {
    }
    Server2.prototype.hello = function (id) {
        return 'hi there!';
    };
    return Server2;
}());
exports.Server2 = Server2;
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
var ServerInterface = /** @class */ (function () {
    function ServerInterface() {
    }
    /**
     *
     * @alias user
     * @method put
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    ServerInterface.prototype.putUser = function (id, user) {
        var u = new model_1.TestUser();
        u.name = user.name;
        return u;
    };
    /**
     *
     * @alias user
     * @method get
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    ServerInterface.prototype.getUser = function (id) {
        var u = new model_1.TestUser();
        return u;
    };
    /**
     *
     * @alias user
     * @method delete
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    ServerInterface.prototype.deleteUser = function (id) {
        var u = new model_1.TestUser();
        return u;
    };
    ServerInterface.prototype.newfn = function (s) {
        return 'Simple string answer';
    };
    /**
     * List all devices in the system
     * @param {string} id here could be the documentation of the ID value
     */
    ServerInterface.prototype.getDevices = function (id) {
        return [
            { id: 1, name: 'MacBook Pro' },
            { id: 2, name: 'iPhone' },
            { id: 3, name: 'Huawei' },
        ];
    };
    ServerInterface.prototype.allUsers = function () {
        return [
            { name: 'First User' },
            { name: 'Second User' },
        ];
    };
    /**
     * Fetch all users
     * @param id of course the user id
     */
    ServerInterface.prototype.users = function (id) {
        return [
            { name: 'First User' },
            { name: 'Second User' },
        ];
    };
    ServerInterface.prototype.createUser = function (u) {
        return 100;
    };
    /**
     * Will set the device data
     * @description ok, looks good
     */
    ServerInterface.prototype.setDeviceData = function (createNewDevice) {
        var value = new model_1.SomeReturnValue();
        value.response = createNewDevice.description + ' OK ';
        return value;
    };
    ServerInterface.prototype.obj = function (v) {
        // Test inserting function code inside some file
        function compilerInsertTest() {
            for (var i = 0; i < 10; i++) {
                console.log(i);
            }
            return 1450;
        }
        // Then the client can use that computer generated code...
        var value = new model_1.SomeReturnValue();
        value.myValue = compilerInsertTest();
        return value;
    };
    /**
     * @nogenerate true
     */
    ServerInterface.prototype.test2 = function (id) {
        if (id > 12) {
            throw new Error('Invalid ID number');
        }
        var value = new model_1.SomeReturnValue();
        value.myValue = 12345;
        return value;
    };
    ServerInterface.prototype.test3 = function (id) {
        if (id > 12) {
            throw new Error('Invalid ID number');
        }
        var value = new model_1.SomeReturnValue();
        value.myValue = 12345;
        return value;
    };
    ServerInterface.prototype.HelloWorld = function (name) {
        return "Hello World " + name;
    };
    ServerInterface.prototype.hello = function (name) {
        return "Hello " + name + "!!!";
    };
    return ServerInterface;
}());
exports.ServerInterface = ServerInterface;
//# sourceMappingURL=api.js.map