"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const index_1 = require("./sync-env/commands/index");
const watchers = [];
function activate(context) {
    context.subscriptions.push(index_1.activateWatchers(watchers));
    context.subscriptions.push(index_1.deactivateWatchers(watchers));
    // Initially activate the watchers.
    vscode.commands.executeCommand('sync-env.activateWatchers');
    // Listen for configuration changes under "sync-env"
    const configListener = vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('sync-env')) {
            // When settings change, deactivate current watchers.
            vscode.commands.executeCommand('sync-env.deactivateWatchers');
            // Clear out the watchers array.
            watchers.splice(0, watchers.length);
            // Then reactivate watchers using the updated settings.
            vscode.commands.executeCommand('sync-env.activateWatchers');
        }
    });
    // Ensure the configuration listener is disposed when the extension deactivates.
    context.subscriptions.push(configListener);
}
exports.activate = activate;
function deactivate() {
    vscode.commands.executeCommand('sync-env.deactivateWatchers');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map