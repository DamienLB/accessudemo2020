/*
 * action types
 */

export const UPDATE_NOTIFCATION = 'UPDATE_NOTIFCATION';
export const CHECK_ORIGIN_CHANGES = 'CHECK_ORIGIN_CHANGES';
export const OBJECT_DROPPED = 'OBJECT_DROPPED';
export const INIT = 'INIT';


/*
 * other constants
 */


/*
 * action creators
 */


export function objectDropped() {
  return { type: OBJECT_DROPPED };
};

export function init() {
  return { type: INIT };
};

export function updateNotification(string, priority) {
  return { type: UPDATE_NOTIFCATION, string, priority };
};

export function checkOriginChanges(tokenOrigin, targetOrigins) {
  return { type: CHECK_ORIGIN_CHANGES, tokenOrigin, targetOrigins };
};