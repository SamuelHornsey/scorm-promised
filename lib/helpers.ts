let attempts: number = 0;

let API: any = null;
let isFound: boolean = false;

/**
 * findApi
 *
 * Finds and returns the API object
 * @param win
 */
function findAPI(win: any): object {
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
function getAPI(): object {
  // start by looking for the API in the current window
  let api = findAPI(window);

  // if the API is null (could not be found in the current window)
  // and the current window has an opener window
  if (
    api == null &&
    window.opener != null &&
    typeof window.opener != "undefined"
  ) {
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
export function debug(debug: boolean, msg: string): void {
  if (!debug) return;

  console.info(`API Message: ${msg}`);
}

/**
 * 
 */
export function getApiHandle(): object {
    if (!API || !isFound) {
        return getAPI();
    }

    return API;
}