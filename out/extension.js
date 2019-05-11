"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sync_env_1 = require("./sync-env");
const watchers = [];
function activate(context) {
    for (let config in sync_env_1.configMapper) {
        watchers.push(sync_env_1.watchFile(config));
    }
    watchers.forEach(disposable => context.subscriptions.push(disposable));
}
exports.activate = activate;
function deactivate() {
    watchers.forEach(disposable => disposable.dispose());
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map