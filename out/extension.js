"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const index_1 = require("./sync-env/commands/index");
const watchers = [];
function activate(context) {
    vscode.window.showInformationMessage(JSON.stringify(index_1.activateWatchers));
    context.subscriptions.push(index_1.activateWatchers(watchers));
    context.subscriptions.push(index_1.deactivateWatchers(watchers));
    vscode.commands.executeCommand('sync-env.activateWatchers');
}
exports.activate = activate;
function deactivate() {
    vscode.commands.executeCommand('sync-env.deactivateWatchers');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map