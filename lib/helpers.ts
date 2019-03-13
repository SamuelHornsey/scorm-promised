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
      throw new Error("API not found");
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
    throw new Error("API not found");
  }

  API = api;
  isFound = true;
  return api;
}

/**
 * Get the API handle
 */
export function getApiHandle(): object {
  if (!API || !isFound) {
    return getAPI();
  }

  return API;
}
