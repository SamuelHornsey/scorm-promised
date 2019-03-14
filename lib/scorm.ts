import { getApiHandle } from './helpers';

// API Handle
const API: any = getApiHandle();

/**
 * Initialises the API
 */
export function init (): Promise<boolean> {
    return new Promise ((res, rej) => {
        if (!API) return rej('API Not found');

        let success = (API.LMSInitialize('') === 'true');

        if (success) return res(true);

        return rej('Unable to init API');
    });
}

/**
 * Terminates the API
 */
export function terminate (): Promise<boolean> {
    return new Promise ((res, rej) => {
        if (!API) return rej('API Not found');

        return set('cmi.core.exit', 'suspend')
            .then(() => commit())
            .then(() => API.LMSFinish(''));
    });
}

/**
 * Sets a value in the scorm API
 * @param param 
 * @param val 
 */
export function set (param: string, val: string): Promise<boolean> {
    return new Promise ((res, rej) => {
        if (!API) return rej('API Not found');

        let success = (API.LMSSetValue(param, val) === 'true');

        if (success) return res(success);

        return rej('Unable to set value');
    });
}

/**
 * Gets a value from the scorm API
 * @param param 
 */
export function get (param: string): Promise<string> {
    return new Promise ((res, rej) => {
        if (!API) return rej('API Not found');

        let val = API.LMSGetValue(param);
        return res(val);
    });
}

/**
 * Commits the SCORM api
 */
export function commit (): Promise<boolean> {
    return new Promise ((res, rej) => {
        if (!API) return rej('API Not found');

        let status = (API.LMSCommit('') === 'true');

        if (status) return res(status);

        return rej('Unable to commit value');
    });
}

/**
 * Gets the last error code
 */
export function getErrorCode (): Promise<string> {
    return new Promise ((res, rej) => {
        if (!API) return rej('API Not found');

        let errorCode = API.GetLastError();

        return res(errorCode);
    });
}