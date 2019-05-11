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
    watchFileChange,
    watchFile
} from './watchers';

export {
    getFileName,
    configMapper,
    readfile, 
    getFilePath, 
    prepareNewConfig, 
    isConfigSame, 
    writefile,
    createFileSystemWatcher,
    watchFileChange,
    watchFile
};

export default configMapper;
