"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./sync-env/index");
const fileWatcherDisposables = [...index_1.default];
function activate(context) {
    fileWatcherDisposables.forEach(disposable => context.subscriptions.push(disposable));
}
exports.activate = activate;
function deactivate() {
    fileWatcherDisposables.forEach(disposable => disposable.dispose());
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map