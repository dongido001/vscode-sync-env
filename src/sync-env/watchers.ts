import * as fs from 'fs';
import * as vscode from 'vscode';
import { 
    getFileName, 
    configMapper, 
    getFilePath, 
    readfile, 
    prepareNewConfig, 
    writefile 
} from './';

export function createFileSystemWatcher(blob: string): vscode.FileSystemWatcher {
    return vscode.workspace.createFileSystemWatcher(blob);
}

export function watchFileChange(file: vscode.Uri): void {
    
    const fileName = getFileName(file.path);

    if ( configMapper[fileName] && fs.existsSync(getFilePath(file.path) + fileName) ) {

        const targetFile = readfile(`${getFilePath(file.path)}${configMapper[fileName]}`);
        const changedFile = readfile(file.path);

        writefile( 
            `${getFilePath(file.path)}${configMapper[fileName]}`, 
            prepareNewConfig(targetFile, changedFile)
        );

        // if (!isConfigSame(targetFile, changedFile)) {
        //     writefile( 
        //         `${getFilePath(file.path)}${configMapper[fileName]}`, 
        //         prepareNewConfig(targetFile, changedFile)
        //     );
        // } 
    }  
}

export function watchFileCreate(file: vscode.Uri): void {

    const fileName = getFileName(file.path);

    if ( configMapper[fileName] && fs.existsSync(getFilePath(file.path)+configMapper[fileName]) ) {
        const targetFile = readfile(`${getFilePath(file.path)}${configMapper[fileName]}`);

        vscode.window.showInformationMessage(`
          You just created an env file which you are 
          watching for changes. Do you want to copy 
          the content of the child(${configMapper[fileName]}) to it?`,  
          ...['No', 'Yes']
        )
        .then(response => {
            if (response === 'Yes') {
                writefile(file.path, targetFile);
            }
        });
    }
}

export function watchFile(file: String): vscode.Disposable {
    const fileWatcher = createFileSystemWatcher(`**/${file}`);

    fileWatcher.onDidChange(watchFileChange);
    fileWatcher.onDidCreate(watchFileCreate);

    return fileWatcher;
}