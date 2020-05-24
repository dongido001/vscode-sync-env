"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
exports.getFileName = helpers_1.getFileName;
exports.readfile = helpers_1.readfile;
exports.getFilePath = helpers_1.getFilePath;
exports.prepareNewConfig = helpers_1.prepareNewConfig;
exports.isConfigSame = helpers_1.isConfigSame;
exports.writefile = helpers_1.writefile;
exports.getEnvSource = helpers_1.getEnvSource;
exports.getEnvDestination = helpers_1.getEnvDestination;
const watchers_1 = require("./watchers");
exports.createFileSystemWatcher = watchers_1.createFileSystemWatcher;
exports.watchFileChange = watchers_1.watchFileChange;
exports.watchFile = watchers_1.watchFile;
exports.default = helpers_1.getEnvSource;
//# sourceMappingURL=index.js.map