/*
 * action types
 */

export const UPDATE_NOTIFCATION = 'UPDATE_NOTIFCATION';

/*
 * other constants
 */

/*
 * action creators
 */


export function updateNotification(string, priority) {
  return { type: UPDATE_NOTIFCATION, string, priority };
}
