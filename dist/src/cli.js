#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var defaults = require("./index");
var args = process.argv.slice(2);
if (args.length === 0) {
    console.log('ts2swagger <directory>');
    process.exit();
}
index_1.createProject({
    path: args[0],
    isServiceClass: defaults.isServiceClass,
    initSwaggerForService: defaults.initSwaggerForService
});
//# sourceMappingURL=cli.js.map