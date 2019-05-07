import * as fs from 'fs';
import * as vscode from 'vscode';
import { 
    getFileName, 
    configMapper, 
    getFilePath, 
    readfile, 
    isConfigSame, 
    prepareNewConfig, 
    writefile 
} from './';

export function createFileSystemWatcher(blob: string): vscode.FileSystemWatcher {
    return vscode.workspace.createFileSystemWatcher(blob);
}

export function disposeFileSystemWatcher(fileSystemWatcher: vscode.FileSystemWatcher): void {
    fileSystemWatcher.dispose();
}

export function watchFileChange(file: vscode.Uri): void {
    
    const fileName = getFileName(file.path);

    if ( configMapper[fileName] && fs.existsSync(getFilePath(file.path) + fileName) ) {

        const targetFile = readfile(`${getFilePath(file.path)}${configMapper[fileName]}`);
        const changedFile = readfile(file.path);

        if (!isConfigSame(targetFile, changedFile)) {
            writefile( 
                `${getFilePath(file.path)}${configMapper[fileName]}`, 
                prepareNewConfig(targetFile, changedFile)
            );
        } 
    }  
}