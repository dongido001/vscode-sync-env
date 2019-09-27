import * as vscode from 'vscode';
import {
	configMapper,
	watchFile
} from '../index';

export default function activateWatchers (watchers: Array<vscode.Disposable> = []) {
    
    return vscode.commands.registerCommand('sync-env.activateWatchers', () => {
        for (let config in configMapper) {
            watchers.push(watchFile(config));
        }
        vscode.window.showInformationMessage("Sync-env Activated!");
    });
}