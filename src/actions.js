/*
 * action types
 */

export const UPDATE_NOTIFCATION = 'UPDATE_NOTIFCATION';
export const CHECK_ORIGIN_CHANGES = 'CHECK_ORIGIN_CHANGES';

/*
 * other constants
 */


/*
 * action creators
 */


export function updateNotification(string, priority) {
  return { type: UPDATE_NOTIFCATION, string, priority };
};

export function checkOriginChanges(tokenOrigin, targetOrigins) {
  return { type: CHECK_ORIGIN_CHANGES, tokenOrigin, targetOrigins };
};