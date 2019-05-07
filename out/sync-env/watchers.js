"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const vscode = require("vscode");
const _1 = require("./");
function createFileSystemWatcher(blob) {
    return vscode.workspace.createFileSystemWatcher(blob);
}
exports.createFileSystemWatcher = createFileSystemWatcher;
function disposeFileSystemWatcher(fileSystemWatcher) {
    fileSystemWatcher.dispose();
}
exports.disposeFileSystemWatcher = disposeFileSystemWatcher;
function watchFileChange(file) {
    const fileName = _1.getFileName(file.path);
    if (_1.configMapper[fileName] && fs.existsSync(_1.getFilePath(file.path) + fileName)) {
        const targetFile = _1.readfile(`${_1.getFilePath(file.path)}${_1.configMapper[fileName]}`);
        const changedFile = _1.readfile(file.path);
        if (!_1.isConfigSame(targetFile, changedFile)) {
            _1.writefile(`${_1.getFilePath(file.path)}${_1.configMapper[fileName]}`, _1.prepareNewConfig(targetFile, changedFile));
        }
    }
}
exports.watchFileChange = watchFileChange;
//# sourceMappingURL=watchers.js.map