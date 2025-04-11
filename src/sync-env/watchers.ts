import * as fs from 'fs';
import * as vscode from 'vscode';
import {
    getFilePath,
    readfile,
    prepareNewConfig,
    writefile,
    getEnvDestination
} from './';

export function createFileSystemWatcher(blob: string): vscode.FileSystemWatcher {
    return vscode.workspace.createFileSystemWatcher(blob);
}

export function watchFileChange(file: vscode.Uri): void {
    const destinationEnv: Array<string> = getEnvDestination();
    const filePath = file.fsPath

    destinationEnv.forEach(destFile => {
        if (fs.existsSync(getFilePath(filePath) + destFile)) {
            const targetFile = readfile(`${getFilePath(filePath)}${destFile}`);
            const changedFile = readfile(filePath);

            writefile(
                `${getFilePath(filePath)}${destFile}`,
                prepareNewConfig(targetFile, changedFile)
            );
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

export function watchFile(file: String): vscode.Disposable {
    const fileWatcher = createFileSystemWatcher(`**/${file}`);
    fileWatcher.onDidChange(watchFileChange);
    fileWatcher.onDidCreate(watchFileCreate);

    console.log(`Watching for changes in ${JSON.stringify(fileWatcher)}`);
    return fileWatcher;
}