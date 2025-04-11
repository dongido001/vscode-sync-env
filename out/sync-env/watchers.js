"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchFile = exports.watchFileCreate = exports.watchFileChange = exports.resolveDestinationPath = exports.createFileSystemWatcher = void 0;
const fs = require("fs");
const vscode = require("vscode");
const pathModule = require("path");
const _1 = require("./");
function createFileSystemWatcher(blob) {
    return vscode.workspace.createFileSystemWatcher(blob);
}
exports.createFileSystemWatcher = createFileSystemWatcher;
function resolveDestinationPath(destFile, sourceFile) {
    // Determine which workspace folder the source file belongs to.
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(sourceFile);
    if (workspaceFolder) {
        // Resolve relative to the workspace folder's root.
        return pathModule.join(workspaceFolder.uri.fsPath, destFile);
    }
    else {
        // Fallback if no workspace folder is detected.
        return destFile;
    }
}
exports.resolveDestinationPath = resolveDestinationPath;
function watchFileChange(file) {
    // Get an array of destination files from your environment
    const destinationEnv = _1.getEnvDestination();
    const filePath = file.fsPath;
    // For each destination file defined in your environment config
    destinationEnv.forEach(destFile => {
        const fullDestPath = resolveDestinationPath(destFile, file);
        if (fs.existsSync(fullDestPath)) {
            const targetFile = _1.readfile(fullDestPath);
            const changedFile = _1.readfile(filePath);
            const newConfig = _1.prepareNewConfig(targetFile, changedFile);
            _1.writefile(fullDestPath, newConfig);
        }
    });
}
exports.watchFileChange = watchFileChange;
function watchFileCreate(file) {
    const destinationEnv = _1.getEnvDestination();
    const filePath = file.fsPath;
    destinationEnv.forEach(destFile => {
        if (fs.existsSync(_1.getFilePath(filePath) + destFile)) {
            const targetFile = _1.readfile(`${_1.getFilePath(filePath)}${destFile}`);
            vscode.window.showInformationMessage(`
              You just created an env file which you are 
              watching for changes. Do you want to copy 
              the content of the child(${destFile}) to it?`, ...['No', 'Yes'])
                .then(response => {
                if (response === 'Yes')
                    _1.writefile(filePath, targetFile);
            });
        }
    });
}
exports.watchFileCreate = watchFileCreate;
function watchFile(file) {
    // Create a glob pattern to match any file with the given name.
    const pattern = `{${file},**/${file}}`;
    // Use the VS Code API to create the file system watcher.
    const fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);
    // Attach event listeners.
    fileWatcher.onDidChange(watchFileChange);
    fileWatcher.onDidCreate(watchFileCreate);
    return fileWatcher;
}
exports.watchFile = watchFile;
//# sourceMappingURL=watchers.js.map