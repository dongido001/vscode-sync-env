import * as vscode from 'vscode';
import {
    readfile, 
    getFilePath, 
    prepareNewConfig, 
    configIsSame, 
    writefile
} from './helpers';

let disposables: Array<vscode.Disposable> = [];

function watchConfigChange (
        parentConfig: string = '.env', 
        childConfig: string = '.env.example'
    ): Array<vscode.Disposable> {

    let fileWatcher = vscode.workspace.createFileSystemWatcher(`**/${parentConfig}`);

    const watchFileChange = fileWatcher.onDidChange( file => {
        if (parentConfig && childConfig) {
            
            const targetFile = readfile(`${getFilePath(file.path)}${childConfig}`);
            const changedFile = readfile(file.path);

            if (!configIsSame(targetFile, changedFile)) {
                writefile( 
                    `${getFilePath(file.path)}${childConfig}`, 
                    prepareNewConfig(targetFile, changedFile)
                );
            } 
        }    
    });

    return [watchFileChange];
}

const watchFileChangeDisposables = watchConfigChange('.env', '.env.example');

watchFileChangeDisposables.forEach(disposable => {
    disposables.push(disposable);
});

export default disposables;
