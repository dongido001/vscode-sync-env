import * as vscode from 'vscode';
import {
	activateWatchers, 
	deactivateWatchers
} from './sync-env/commands/index';

const watchers : Array<vscode.Disposable> = [];

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(activateWatchers(watchers));
	context.subscriptions.push(deactivateWatchers(watchers));

	// Initially activate the watchers.
	vscode.commands.executeCommand('sync-env.activateWatchers');

	// Listen for configuration changes under "sync-env"
	const configListener = vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('sync-env')) {
			// When settings change, deactivate current watchers.
			vscode.commands.executeCommand('sync-env.deactivateWatchers');
			// Clear out the watchers array.
			watchers.splice(0, watchers.length);
			// Then reactivate watchers using the updated settings.
			vscode.commands.executeCommand('sync-env.activateWatchers');
		}
	});

	// Ensure the configuration listener is disposed when the extension deactivates.
	context.subscriptions.push(configListener);

}

export function deactivate() {
	vscode.commands.executeCommand('sync-env.deactivateWatchers');
}
