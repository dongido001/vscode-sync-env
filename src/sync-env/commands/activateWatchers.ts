import * as vscode from 'vscode';
import {
    getEnvSource,
    watchFile
} from '../index';

export default function activateWatchers(watchers: Array<vscode.Disposable> = []) {
    return vscode.commands.registerCommand('sync-env.activateWatchers', () => {
        const sourceFile: string = getEnvSource();
        watchers.push(watchFile(sourceFile));
    });
}