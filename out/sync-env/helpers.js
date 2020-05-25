"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    let { envDestination } = settings;
    if (!envDestination || !envDestination.length) {
        // empty destination file provided or invalid...
        // default to `.env`
        envDestination = ".env.example";
    }
    // remove source envFile from destination envFile
    // to fix a bug of unbreakable loop...
    const sourceEnv = getEnvSource();
    envDestination = envDestination.filter((f) => f !== sourceEnv);
    return envDestination;
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
            const lineArray = line.split('=');
            config.push({
                isSpace: !lineArray[0],
                key: lineArray[0] || 'space',
                value: lineArray[1] || '',
            });
        }
    });
    return config;
}
exports.envToObjectWithSpace = envToObjectWithSpace;
function envToObject(env) {
    const config = [];
    env
        .split('\n')
        .forEach(line => {
        const lineArray = line.split('=');
        config[lineArray[0] || 'space'] = lineArray[1] || '';
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
        else if (config.key in targetConfigObject) {
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