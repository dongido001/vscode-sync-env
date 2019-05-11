import * as fs from 'fs';
import * as vscode from 'vscode';

export const configMapper: {[key: string]: string} = {
   '.env': '.env.example',
//    '.env.example': '.env'
};

export function getFileName(path: String): string {
    return path.replace(/\/.*\//, '');
}

export function getFilePath(path: String): string {
    return path.replace(/\..*/, '');
}

export function writefile (path: string, data: string) {
    fs.writeFileSync(path, data, 'utf8');
}

export function readfile (path: string) {
    return fs.readFileSync(path,'utf8');
}

export function envToObjectWithSpace (env: string): Array<any> {
    const config: Array<any> = [];

    env.split('\n').forEach( line => {
        const lineArray = line.split('=');
        config.push({
            isSpace: !lineArray[0],
            key: lineArray[0] || 'space',
            value: lineArray[1] || '',
        });
    });

    return config;
}

export function envToObject (env: string): Array<any> {
    const config: any = [];

    env.split('\n').forEach( line => {
        const lineArray = line.split('=');
        config[lineArray[0] || 'space'] = lineArray[1] || '';
    });

    return config;
}

export function prepareNewConfig (targetConfig: string, changedConfig: string): any {
    const targetConfigObject: Array<any> = envToObject(targetConfig);
    const changedConfigObject: Array<any> = envToObjectWithSpace(changedConfig);

    let result: Array<string> = [];

    changedConfigObject.forEach( config => {
        if (config.isSpace) {
            result.push('');
        } else if (config.key in targetConfigObject) {
            result.push(`${config.key}=${targetConfigObject[config.key]}`);
        } else {
            result.push(`${config.key}=`);
        }
    });

    return result.join('\n');
}

export function isConfigSame (targetConfig: string, changedConfig: string): Boolean {
    return (targetConfig.replace(/=.*/g, '') === changedConfig.replace(/=.*/g, ''));
}