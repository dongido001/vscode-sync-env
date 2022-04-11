"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvDestination = exports.getEnvSource = exports.watchFile = exports.watchFileChange = exports.createFileSystemWatcher = exports.writefile = exports.isConfigSame = exports.prepareNewConfig = exports.getFilePath = exports.readfile = exports.getFileName = void 0;
const helpers_1 = require("./helpers");
Object.defineProperty(exports, "getFileName", { enumerable: true, get: function () { return helpers_1.getFileName; } });
Object.defineProperty(exports, "readfile", { enumerable: true, get: function () { return helpers_1.readfile; } });
Object.defineProperty(exports, "getFilePath", { enumerable: true, get: function () { return helpers_1.getFilePath; } });
Object.defineProperty(exports, "prepareNewConfig", { enumerable: true, get: function () { return helpers_1.prepareNewConfig; } });
Object.defineProperty(exports, "isConfigSame", { enumerable: true, get: function () { return helpers_1.isConfigSame; } });
Object.defineProperty(exports, "writefile", { enumerable: true, get: function () { return helpers_1.writefile; } });
Object.defineProperty(exports, "getEnvSource", { enumerable: true, get: function () { return helpers_1.getEnvSource; } });
Object.defineProperty(exports, "getEnvDestination", { enumerable: true, get: function () { return helpers_1.getEnvDestination; } });
const watchers_1 = require("./watchers");
Object.defineProperty(exports, "createFileSystemWatcher", { enumerable: true, get: function () { return watchers_1.createFileSystemWatcher; } });
Object.defineProperty(exports, "watchFileChange", { enumerable: true, get: function () { return watchers_1.watchFileChange; } });
Object.defineProperty(exports, "watchFile", { enumerable: true, get: function () { return watchers_1.watchFile; } });
exports.default = helpers_1.getEnvSource;
//# sourceMappingURL=index.js.map