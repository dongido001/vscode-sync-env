import * as vscode from 'vscode';
import {
	activateWatchers, 
	deactivateWatchers
} from './sync-env/commands/index';

const watchers : Array<vscode.Disposable> = [];

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(activateWatchers(watchers));
	context.subscriptions.push(deactivateWatchers(watchers));

	vscode.commands.executeCommand('sync-env.activateWatchers');
}

export function deactivate() {
	vscode.commands.executeCommand('sync-env.deactivateWatchers');
}
