"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const index_1 = require("../index");
function activateWatchers(watchers = []) {
    return vscode.commands.registerCommand('sync-env.activateWatchers', () => {
        for (let config in index_1.configMapper) {
            watchers.push(index_1.watchFile(config));
        }
        vscode.window.showInformationMessage("Sync-env Activated!");
    });
}
exports.default = activateWatchers;
//# sourceMappingURL=activateWatchers.js.map