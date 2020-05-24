"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const index_1 = require("../index");
function activateWatchers(watchers = []) {
    return vscode.commands.registerCommand('sync-env.activateWatchers', () => {
        const sourceFile = index_1.getEnvSource();
        watchers.push(index_1.watchFile(sourceFile));
        vscode.window.showInformationMessage("Sync-env Activated!");
    });
}
exports.default = activateWatchers;
//# sourceMappingURL=activateWatchers.js.map