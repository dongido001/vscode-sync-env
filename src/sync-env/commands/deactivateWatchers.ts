import * as vscode from 'vscode';

export default function deactivateWatchers (watchers: Array<vscode.Disposable> = []) {
    
    return vscode.commands.registerCommand('sync-env.deactivateWatchers', () => {
        watchers.forEach(disposable => disposable.dispose());
        vscode.window.showInformationMessage("Sync-env Deactivated!");
    });
}