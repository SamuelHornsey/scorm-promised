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
 *
 */
function getApiHandle() {
    if (!API || !isFound) {
        return getAPI();
    }
    return API;
}
//# sourceMappingURL=helpers.js.map

var API$1 = getApiHandle();
function init() {
    return new Promise(function (res, rej) {
        if (!API$1)
            return rej();
        var success = API$1.LMSInitialize('');
        if (success)
            return res(true);
        return rej();
    });
}
function terminate() {
    return new Promise(function (res, rej) {
        res(true);
    });
}
function set(param, val) {
    return new Promise(function (res, rej) {
        res(true);
    });
}
function get(param) {
    return new Promise(function (res, rej) {
        res('res');
    });
}
function commit() {
    return new Promise(function (res, rej) {
        res(true);
    });
}

//# sourceMappingURL=index.js.map

export { set, get, terminate, commit, init };
