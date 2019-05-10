import * as vscode from 'vscode';
import {
	configMapper,
	watchFile
} from './sync-env';

const watchers : Array<vscode.Disposable> = [];

export function activate(context: vscode.ExtensionContext) {
	for (let config in configMapper) {
	  watchers.push(watchFile(config));
	}
	
	watchers.forEach(disposable => context.subscriptions.push(disposable));
}

export function deactivate() {
	watchers.forEach(disposable => disposable.dispose());
}
