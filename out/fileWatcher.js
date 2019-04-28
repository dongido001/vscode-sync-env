"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
let fileWatcher = vscode.workspace.createFileSystemWatcher(`**/*.koa`);
let disposables = [];
const watchFileChange = fileWatcher.onDidChange(file => {
    vscode.window.showInformationMessage(`Hello World!${file}`);
});
const watchCreateFile = fileWatcher.onDidCreate(file => {
    vscode.window.showInformationMessage(`Hello World!${file}`);
});
const watchDeleteFile = fileWatcher.onDidDelete(file => {
    vscode.window.showInformationMessage(`Hello World!${file}`);
});
disposables = [watchFileChange, watchCreateFile, watchDeleteFile];
exports.default = disposables;
//# sourceMappingURL=fileWatcher.js.map