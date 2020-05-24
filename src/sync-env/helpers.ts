import * as fs from 'fs';
import * as vscode from 'vscode';

export function getEnvSource(): string {
    const settings = vscode.workspace.getConfiguration('sync-env');
    let { envSource } = settings;

    if (!envSource || !envSource.length) {
        // empty source file provided or invalid...
        // default to `.env`
        envSource = ".env";
    }

    return envSource;
}

export function getEnvDestination(): string | Array<string> {
    const settings = vscode.workspace.getConfiguration('sync-env');
    let { envDestination } = settings;

    if (!envDestination || !envDestination.length) {
        // empty destination file provided or invalid...
        // default to `.env`
        envDestination = ".env.example";
    }

    return envDestination;
}

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

    env
        .split('\n')
        .forEach( line => {
            if (line.startsWith('#')) {
                config.push({
                    isSpace: false,
                    isComment: true,
                    key: '*****comment*****',
                    value: line,
                });
            } else {
                const lineArray = line.split('=');
                config.push({
                    isSpace: !lineArray[0],
                    key: lineArray[0] || 'space',
                    value: lineArray[1] || '',
                });
            }
        });

    return config;
}

export function envToObject (env: string): Array<any> {
    const config: any = [];

    env
        .split('\n')
        .forEach( line => {
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
        if (config.isComment) {
            result.push(config.value);
        } else if (config.isSpace) {
            result.push('');
        } else if (config.value.match(/["']\s*\${.*}\s*["']/)) {
            result.push(`${config.key}=${config.value}`);
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