import * as vscode from 'vscode';
import {
    configMapper,
    getFileName,
    readfile, 
    getFilePath, 
    prepareNewConfig, 
    isConfigSame, 
    writefile,
} from './helpers';
import {
    createFileSystemWatcher,
    disposeFileSystemWatcher,
    watchFileChange
} from './watchers'

export {
    getFileName,
    configMapper,
    readfile, 
    getFilePath, 
    prepareNewConfig, 
    isConfigSame, 
    writefile,
    createFileSystemWatcher,
    disposeFileSystemWatcher,
    watchFileChange
};

export default configMapper;
