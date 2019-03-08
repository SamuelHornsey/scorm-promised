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
            debug(true, 'Error finding API');
            return null;
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
        debug(true, 'Unable to find an API adapter');
    }
    API = api;
    isFound = true;
    return api;
}
/**
 * Console logs debug messages
 */
function debug(debug, msg) {
    if (!debug)
        return;
    console.info("API Message: " + msg);
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

var Scorm = /** @class */ (function () {
    function Scorm(opts) {
        if (opts === void 0) { opts = { debug: false }; }
        this.API = null;
        this.debug = false;
        this.isActive = false;
        this.debug = opts.debug;
        this.API = getApiHandle();
    }
    /**
     * Initializes the SCORM API
     */
    Scorm.prototype.init = function () {
        if (this.isActive)
            return true;
        var success = this.API.LMSInitialize('');
        debug(this.debug, "LMS Status " + success);
        if (success) {
            this.isActive = true;
            return success;
        }
        return success;
    };
    /**
     * Terminates the SCORM session
     */
    Scorm.prototype.terminate = function () {
        this.set('cmi.core.exit', 'suspend');
        this.commit();
        this.API.LMSFinish('');
        return true;
    };
    /**
     * Gets a parameter from the SCORM API
     * @param param
     */
    Scorm.prototype.get = function (param) {
        var val = this.API.LMSGetValue(param);
        debug(this.debug, "this.API.LMSGetValue(" + param + ") = " + val);
        return val;
    };
    /**
     * Sets a parameter in the SCORM API
     * @param param
     * @param value
     */
    Scorm.prototype.set = function (param, value) {
        debug(this.debug, "this.API.LMSSetValue(" + param + ", " + value + ")");
        this.API.LMSSetValue(param, value);
    };
    /**
     * Commits data to the LMS
     */
    Scorm.prototype.commit = function () {
        return this.API.LMSCommit('');
    };
    return Scorm;
}());

export { Scorm };
