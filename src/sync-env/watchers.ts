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
    const destinationEnv: string | Array<string> = getEnvDestination();
    let des: Array<string> = [];

    // We want to turn string to array
    if (typeof destinationEnv === 'string' || destinationEnv instanceof String) {
        des = [destinationEnv as string];
    } else {
        des = [...destinationEnv];
    }

    des.forEach(destFile => {
        if (fs.existsSync(getFilePath(file.path) + destFile)) {
            const targetFile = readfile(`${getFilePath(file.path)}${destFile}`);
            const changedFile = readfile(file.path);

            writefile(
                `${getFilePath(file.path)}${destFile}`,
                prepareNewConfig(targetFile, changedFile)
            );
        }
    });

    vscode.window.showInformationMessage(JSON.stringify(des));
}

export function watchFileCreate(file: vscode.Uri): void {
    const destinationEnv: string | Array<string> = getEnvDestination();
    let des: Array<string> = [];

    // We want to turn string to array
    if (typeof destinationEnv === 'string' || destinationEnv instanceof String) {
        des = [destinationEnv as string];
    } else {
        des = [...destinationEnv];
    }

    des.forEach(destFile => {
        if (fs.existsSync(getFilePath(file.path) + destFile)) {
            const targetFile = readfile(`${getFilePath(file.path)}${destFile}`);

            vscode.window.showInformationMessage(`
              You just created an env file which you are 
              watching for changes. Do you want to copy 
              the content of the child(${destFile}) to it?`,
                ...['No', 'Yes']
            )
                .then(response => {
                    if (response === 'Yes') {
                        writefile(file.path, targetFile);
                    }
                });
        }
    });
}

export function watchFile(file: String): vscode.Disposable {
    const fileWatcher = createFileSystemWatcher(`**/${file}`);

    fileWatcher.onDidChange(watchFileChange);
    fileWatcher.onDidCreate(watchFileCreate);

    return fileWatcher;
}