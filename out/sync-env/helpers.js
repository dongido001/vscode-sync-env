"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.configMapper = {
    '.env': '.env.example',
};
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
    env.split('\n').forEach(line => {
        const lineArray = line.split('=');
        config.push({
            isSpace: !lineArray[0],
            key: lineArray[0] || 'space',
            value: lineArray[1] || '',
        });
    });
    return config;
}
exports.envToObjectWithSpace = envToObjectWithSpace;
function envToObject(env) {
    const config = [];
    env.split('\n').forEach(line => {
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
        if (config.isSpace) {
            result.push('');
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