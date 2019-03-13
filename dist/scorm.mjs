var attempts = 0;
var API = null;
var isFound = false;
/**
 * findApi
 *
 * Finds and returns the API object
 * @param win
 */
function findAPI(win) {
    while (win.API == null && win.parent != null && win.parent != win) {
        attempts++;
        // Note: 7 is an arbitrary number, but should be more than sufficient
        if (attempts > 7) {
            throw new Error("API not found");
        }
        win = win.parent;
    }
    return win.API;
}
/**
 * getAPI
 */
function getAPI() {
    // start by looking for the API in the current window
    var api = findAPI(window);
    // if the API is null (could not be found in the current window)
    // and the current window has an opener window
    if (api == null &&
        window.opener != null &&
        typeof window.opener != "undefined") {
        // try to find the API in the current window’s opener
        api = findAPI(window.opener);
    }
    // if the API has not been found
    if (api == null) {
        // Alert the user that the API Adapter could not be found
        throw new Error("API not found");
    }
    API = api;
    isFound = true;
    return api;
}
/**
 * Get the API handle
 */
function getApiHandle() {
    if (!API || !isFound) {
        return getAPI();
    }
    return API;
}

// API Handle
var API$1 = getApiHandle();
/**
 * Initialises the API
 */
function init() {
    return new Promise(function (res, rej) {
        if (!API$1)
            return rej('API Not found');
        var success = (API$1.LMSInitialize('') === 'true');
        if (success)
            return res(true);
        return rej('Unable to init API');
    });
}
/**
 * Terminates the API
 */
function terminate() {
    return new Promise(function (res, rej) {
        if (!API$1)
            return rej('API Not found');
        return set('cmi.core.exit', 'suspend')
            .then(function () { return commit(); })
            .then(function () { return API$1.LMSFinish(''); });
    });
}
/**
 * Sets a value in the scorm API
 * @param param
 * @param val
 */
function set(param, val) {
    return new Promise(function (res, rej) {
        if (!API$1)
            return rej('API Not found');
        var success = (API$1.LMSSetValue(param, val) === 'true');
        if (success)
            return res(success);
        return rej('Unable to set value');
    });
}
/**
 * Gets a value from the scorm API
 * @param param
 */
function get(param) {
    return new Promise(function (res, rej) {
        if (!API$1)
            return rej('API Not found');
        var val = API$1.LMSGetValue(param);
        return res(val);
    });
}
/**
 * Commits the SCORM api
 */
function commit() {
    return new Promise(function (res, rej) {
        if (!API$1)
            return rej('API Not found');
        var status = (API$1.LMSCommit('') === 'true');
        if (status)
            return res(status);
        return rej('Unable to commit value');
    });
}

export { set, get, terminate, commit, init };
