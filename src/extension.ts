import * as vscode from 'vscode';
import fileWatcher from './sync-env/index';

const fileWatcherDisposables = [...fileWatcher];

export function activate(context: vscode.ExtensionContext) {
	fileWatcherDisposables.forEach(disposable => context.subscriptions.push(disposable));
}

export function deactivate() {
	fileWatcherDisposables.forEach(disposable => disposable.dispose());
}
