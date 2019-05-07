"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sync_env_1 = require("./sync-env");
const watchers = [];
function activate(context) {
    const fileWatcher = sync_env_1.createFileSystemWatcher(`**/.env*`);
    watchers.push(fileWatcher.onDidChange(sync_env_1.watchFileChange));
    watchers.forEach(disposable => context.subscriptions.push(disposable));
}
exports.activate = activate;
function deactivate() {
    watchers.forEach(disposable => disposable.dispose());
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map