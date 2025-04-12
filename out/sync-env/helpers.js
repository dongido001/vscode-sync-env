"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConfigSame = exports.prepareNewConfig = exports.envToObject = exports.envToObjectWithSpace = exports.readfile = exports.writefile = exports.resolveDestinationPath = exports.getFilePath = exports.getFileName = exports.getEnvDestination = exports.getEnvSource = void 0;
const fs = require("fs");
const vscode = require("vscode");
const pathModule = require("path");
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
function getFileName(filePath) {
    return pathModule.basename(filePath);
}
exports.getFileName = getFileName;
function getFilePath(filePath) {
    const parsed = pathModule.parse(filePath);
    // Return the full path without the file extension.
    return pathModule.join(parsed.dir, "/");
}
exports.getFilePath = getFilePath;
function resolveDestinationPath(destFile) {
    var _a;
    if (pathModule.isAbsolute(destFile)) {
        // Use the user-provided absolute path directly.
        return destFile;
    }
    else {
        // If it's relative, resolve it relative to the first workspace folder.
        const workspaceFolder = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[0];
        if (workspaceFolder) {
            return pathModule.join(workspaceFolder.uri.fsPath, destFile);
        }
        // Fallback: just return destFile as is, though this might not be ideal.
        return destFile;
    }
}
exports.resolveDestinationPath = resolveDestinationPath;
function writefile(path, data) {
    fs.writeFileSync(path, data, 'utf8');
}
exports.writefile = writefile;
function readfile(path) {
    return fs.readFileSync(path, 'utf8');
}
exports.readfile = readfile;
function envToObjectWithSpace(env) {
    const settings = vscode.workspace.getConfiguration('sync-env');
    let { ignoreSensitiveComments = false } = settings;
    const config = [];
    env.split('\n').forEach(line => {
        if (line.startsWith('#')) {
            // Remove the '#' and trim whitespace to analyze the content.
            const uncommented = line.slice(1).trim();
            // Check if the content resembles a commented-out environment variable assignment.
            if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(uncommented) && ignoreSensitiveComments) {
                // If it does, skip this line to avoid leaking sensitive info.
                return;
            }
            // Otherwise, treat it as a genuine comment.
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