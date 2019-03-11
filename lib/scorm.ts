import { getApiHandle } from './helpers';

const API: any = getApiHandle();

export function init (): Promise<boolean> {
    return new Promise ((res, rej) => {
        if (!API) return rej();

        let success = API.LMSInitialize('');

        if (success) return res(true);

        return rej();
    });
}

export function terminate (): Promise<boolean> {
    return new Promise ((res, rej) => {
        res(true);
    });
}

export function set (param: string, val: string): Promise<boolean> {
    return new Promise ((res, rej) => {
        res(true);
    });
}

export function get (param: string): Promise<string> {
    return new Promise ((res, rej) => {
        res('res');
    });
}

export function commit (): Promise<boolean> {
    return new Promise ((res, rej) => {
        res(true);
    });
}