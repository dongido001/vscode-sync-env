import * as fs from 'fs';
import * as vscode from 'vscode';
import * as pathModule from 'path';

import {
    getFilePath,
    readfile,
    prepareNewConfig,
    writefile,
    getEnvDestination,
} from './';

export function createFileSystemWatcher(blob: string): vscode.FileSystemWatcher {
    return vscode.workspace.createFileSystemWatcher(blob);
}

export function resolveDestinationPath(destFile: string, sourceFile: vscode.Uri): string {
    // Determine which workspace folder the source file belongs to.
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(sourceFile);
    if (workspaceFolder) {
        // Resolve relative to the workspace folder's root.
        return pathModule.join(workspaceFolder.uri.fsPath, destFile);
    } else {
        // Fallback if no workspace folder is detected.
        return destFile;
    }
}

export function watchFileChange(file: vscode.Uri): void {
    // Get an array of destination files from your environment
    const destinationEnv: string[] = getEnvDestination();
    const filePath: string = file.fsPath;

    // For each destination file defined in your environment config
    destinationEnv.forEach(destFile => {
        const fullDestPath = resolveDestinationPath(destFile, file);
        if (fs.existsSync(fullDestPath)) {
            const targetFile = readfile(fullDestPath);
            const changedFile = readfile(filePath);
            const newConfig = prepareNewConfig(targetFile, changedFile);
            writefile(fullDestPath, newConfig);
        }
    });
}

export function watchFileCreate(file: vscode.Uri): void {
    const destinationEnv: Array<string> = getEnvDestination();
    const filePath = file.fsPath

    destinationEnv.forEach(destFile => {
        if (fs.existsSync(getFilePath(filePath) + destFile)) {
            const targetFile = readfile(`${getFilePath(filePath)}${destFile}`);

            vscode.window.showInformationMessage(`
              You just created an env file which you are 
              watching for changes. Do you want to copy 
              the content of the child(${destFile}) to it?`,
                ...['No', 'Yes']
            )
            .then(response => {
                if (response === 'Yes') writefile(filePath, targetFile);
            });
        }
    });
}

export function watchFile(file: string): vscode.Disposable {
    // Create a glob pattern to match any file with the given name.
    const pattern = `{${file},**/${file}}`;

    // Use the VS Code API to create the file system watcher.
    const fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);
    
    // Attach event listeners.
    fileWatcher.onDidChange(watchFileChange);
    fileWatcher.onDidCreate(watchFileCreate);

    return fileWatcher;
}
