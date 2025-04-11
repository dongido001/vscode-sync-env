import * as fs from 'fs';
import * as vscode from 'vscode';
import * as pathModule from 'path';

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

export function getEnvDestination(): Array<string> {
    const settings = vscode.workspace.getConfiguration('sync-env');
    const sourceEnv: string = getEnvSource();
    let { envDestination } = settings;

    const destinationComputed: Array<string> = []

    if (!envDestination || !envDestination.length) {
        // empty destination file provided or invalid...
        // let's default to `.env.example`
        envDestination = ".env.example";
    }

    if (Array.isArray(envDestination)) {
        destinationComputed.push(...envDestination)
    } else {
        // it's a string
        destinationComputed.push(envDestination)
    }

    // remove source envFile from destination envFile
    // to fix a bug of unbreakable loop...
    return destinationComputed.filter((destinationEnv: string) => destinationEnv !== sourceEnv);
}

// export function getFileName(path: String): string {
//     return path.replace(/\/.*\//, '');
// }

// export function getFilePath(path: String): string {
//     return path.replace(/\..*/, '');
// }

export function getFileName(filePath: string): string {
    return pathModule.basename(filePath);
}

export function getFilePath(filePath: string): string {
    const parsed = pathModule.parse(filePath);
    // Return the full path without the file extension.
    return pathModule.join(parsed.dir, "/");
}

export function resolveDestinationPath(destFile: string): string {
    if (pathModule.isAbsolute(destFile)) {
        // Use the user-provided absolute path directly.
        return destFile;
    } else {
        // If it's relative, resolve it relative to the first workspace folder.
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (workspaceFolder) {
            return pathModule.join(workspaceFolder.uri.fsPath, destFile);
        }
        // Fallback: just return destFile as is, though this might not be ideal.
        return destFile;
    }
}

export function writefile(path: string, data: string) {
    fs.writeFileSync(path, data, 'utf8');
}

export function readfile(path: string) {
    return fs.readFileSync(path, 'utf8');
}

export function envToObjectWithSpace(env: string): Array<any> {
    const config: Array<any> = [];
    env.split('\n').forEach(line => {
        if (line.startsWith('#')) {
            // Remove the '#' and trim whitespace to analyze the content.
            const uncommented = line.slice(1).trim();
            // Check if the content resembles a commented-out environment variable assignment.
            if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(uncommented)) {
                // If it does, skip this line to avoid leaking sensitive info.
                return;
            }
            // Otherwise, treat it as a genuine comment.
            config.push({
                isSpace: false,
                isComment: true,
                key: '*****comment*****',
                value: line,
            });
        } else {
            const [key, ...value] = line.split('=');
            config.push({
                isSpace: !key,
                key: key || 'space',
                value: value.join("=") || '',
            });
        }
    });
    return config;
}

export function envToObject(env: string): Array<any> {
    const config: any = {};

    env
        .split('\n')
        .forEach(line => {
            const [key, ...value] = line.split('=');
            config[key || 'space'] = value.join("=");
        });

    return config;
}

export function prepareNewConfig(targetConfig: string, changedConfig: string): any {
    const targetConfigObject: Array<any> = envToObject(targetConfig);
    const changedConfigObject: Array<any> = envToObjectWithSpace(changedConfig);

    let result: Array<string> = [];

    changedConfigObject.forEach(config => {
        if (config.isComment) {
            result.push(config.value);
        } else if (config.isSpace) {
            result.push('');
        } else if (config.value.match(/["']\s*\${.*}\s*["']/)) {
            result.push(`${config.key}=${config.value}`);
        } else if (targetConfigObject?.[config.key]) {
            result.push(`${config.key}=${targetConfigObject[config.key]}`);
        } else {
            result.push(`${config.key}=`);
        }
    });

    return result.join('\n');
}

export function isConfigSame(targetConfig: string, changedConfig: string): Boolean {
    return (targetConfig.replace(/=.*/g, '') === changedConfig.replace(/=.*/g, ''));
}