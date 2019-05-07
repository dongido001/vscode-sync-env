import * as vscode from 'vscode';
import {
	watchFileChange,
	createFileSystemWatcher, 
} from './sync-env';

const watchers : Array<vscode.Disposable> = [];

export function activate(context: vscode.ExtensionContext) {
	const fileWatcher = createFileSystemWatcher(`**/.env*`);

	watchers.push(fileWatcher.onDidChange(watchFileChange));

	watchers.forEach(disposable => context.subscriptions.push(disposable));
}

export function deactivate() {
	watchers.forEach(disposable => disposable.dispose());
}
