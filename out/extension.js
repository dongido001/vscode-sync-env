"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./sync-env/index");
function activate(context) {
    const disposables = [...index_1.default];
    disposables.forEach(disposable => context.subscriptions.push(disposable));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map