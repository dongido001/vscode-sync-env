"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConfigSame = exports.prepareNewConfig = exports.envToObject = exports.envToObjectWithSpace = exports.readfile = exports.writefile = exports.getFilePath = exports.getFileName = exports.getEnvDestination = exports.getEnvSource = void 0;
const fs = require("fs");
const vscode = require("vscode");
function getEnvSource() {
    const settings = vscode.workspace.getConfiguration('sync-env');
    let { envSource } = settings;
    if (!envSource || !envSource.length) {
        // empty source file provided or invalid...
        // default to `.env`
        envSource = ".env";
    }
    return envSource;
}
exports.getEnvSource = getEnvSource;
function getEnvDestination() {
    const settings = vscode.workspace.getConfiguration('sync-env');
    const sourceEnv = getEnvSource();
    let { envDestination } = settings;
    const destinationComputed = [];
    if (!envDestination || !envDestination.length) {
        // empty destination file provided or invalid...
        // let's default to `.env.example`
        envDestination = ".env.example";
    }
    if (Array.isArray(envDestination)) {
        destinationComputed.push(...envDestination);
    }
    else {
        // it's a string
        destinationComputed.push(envDestination);
    }
    // remove source envFile from destination envFile
    // to fix a bug of unbreakable loop...
    return destinationComputed.filter((destinationEnv) => destinationEnv !== sourceEnv);
}
exports.getEnvDestination = getEnvDestination;
function getFileName(path) {
    return path.replace(/\/.*\//, '');
}
exports.getFileName = getFileName;
function getFilePath(path) {
    return path.replace(/\..*/, '');
}
exports.getFilePath = getFilePath;
function writefile(path, data) {
    fs.writeFileSync(path, data, 'utf8');
}
exports.writefile = writefile;
function readfile(path) {
    return fs.readFileSync(path, 'utf8');
}
exports.readfile = readfile;
function envToObjectWithSpace(env) {
    const config = [];
    env
        .split('\n')
        .forEach(line => {
        if (line.startsWith('#')) {
            config.push({
                isSpace: false,
                isComment: true,
                key: '*****comment*****',
                value: line,
            });
        }
        else {
            const [key, ...value] = line.split('=');
            config.push({
                isSpace: !key,
                key: key || 'space',
                value: value.join("=") || '',
            });
        }
    });
    return config;
}
exports.envToObjectWithSpace = envToObjectWithSpace;
function envToObject(env) {
    const config = {};
    env
        .split('\n')
        .forEach(line => {
        const [key, ...value] = line.split('=');
        config[key || 'space'] = value.join("=");
    });
    return config;
}
exports.envToObject = envToObject;
function prepareNewConfig(targetConfig, changedConfig) {
    const targetConfigObject = envToObject(targetConfig);
    const changedConfigObject = envToObjectWithSpace(changedConfig);
    let result = [];
    changedConfigObject.forEach(config => {
        if (config.isComment) {
            result.push(config.value);
        }
        else if (config.isSpace) {
            result.push('');
        }
        else if (config.value.match(/["']\s*\${.*}\s*["']/)) {
            result.push(`${config.key}=${config.value}`);
        }
        else if (targetConfigObject === null || targetConfigObject === void 0 ? void 0 : targetConfigObject[config.key]) {
            result.push(`${config.key}=${targetConfigObject[config.key]}`);
        }
        else {
            result.push(`${config.key}=`);
        }
    });
    return result.join('\n');
}
exports.prepareNewConfig = prepareNewConfig;
function isConfigSame(targetConfig, changedConfig) {
    return (targetConfig.replace(/=.*/g, '') === changedConfig.replace(/=.*/g, ''));
}
exports.isConfigSame = isConfigSame;
//# sourceMappingURL=helpers.js.map