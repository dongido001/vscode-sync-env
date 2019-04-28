import * as vscode from 'vscode';
import fileWatcher from './sync-env/index';

export function activate(context: vscode.ExtensionContext) {
	const disposables = [...fileWatcher];
	
	disposables.forEach(disposable => context.subscriptions.push(disposable));
}

export function deactivate() {}
