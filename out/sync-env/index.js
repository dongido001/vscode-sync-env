"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const helpers_1 = require("./helpers");
let disposables = [];
function watchConfigChange(parentConfig = '.env', childConfig = '.env.example') {
    let fileWatcher = vscode.workspace.createFileSystemWatcher(`**/${parentConfig}`);
    const watchFileChange = fileWatcher.onDidChange(file => {
        if (parentConfig && childConfig) {
            const targetFile = helpers_1.readfile(`${helpers_1.getFilePath(file.path)}${childConfig}`);
            const changedFile = helpers_1.readfile(file.path);
            if (!helpers_1.configIsSame(targetFile, changedFile)) {
                helpers_1.writefile(`${helpers_1.getFilePath(file.path)}${childConfig}`, helpers_1.prepareNewConfig(targetFile, changedFile));
            }
        }
    });
    return [watchFileChange];
}
const watchFileChangeDisposables = watchConfigChange('.env', '.env.example');
watchFileChangeDisposables.forEach(disposable => {
    disposables.push(disposable);
});
exports.default = disposables;
//# sourceMappingURL=index.js.map