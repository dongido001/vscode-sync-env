import * as vscode from 'vscode';
import {
    getEnvSource,
    watchFile,
    getEnvDestination
} from '../index';

export default function activateWatchers(watchers: Array<vscode.Disposable> = []) {
    return vscode.commands.registerCommand('sync-env.activateWatchers', () => {
        const sourceFile: string = getEnvSource();
        console.log(sourceFile, getEnvDestination())
        watchers.push(watchFile(sourceFile));
        vscode.window.showInformationMessage("Sync-env Activated!");
    });
}