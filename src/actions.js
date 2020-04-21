/*
 * action types
 */

export const UPDATE_NOTIFCATION = 'UPDATE_NOTIFCATION';
export const CHECK_ORIGIN_CHANGES = 'CHECK_ORIGIN_CHANGES';
export const OBJECT_DROPPED = 'OBJECT_DROPPED';
export const TOGGLE_SOUND = 'TOGGLE_SOUND';
export const TOGGLE_VOICE = 'TOGGLE_VOICE';
export const TOGGLE_TRAIN_GESTURE = 'TOGGLE_TRAIN_GESTURE';
export const TOGGLE_GESTURE = 'TOGGLE_GESTURE';
export const VIDEO_READY = 'VIDEO_READY';
export const ENABLE_GESTURE = 'ENABLE_GESTURE';
export const INIT = 'INIT';


/*
 * other constants
 */


/*
 * action creators
 */


export function enableGesture() {
  return { type: ENABLE_GESTURE };
};

export function videoReady(videoEl) {
  return { type: VIDEO_READY, videoEl };
};

export function toggleTrainGesture() {
  return { type: TOGGLE_TRAIN_GESTURE };
};

export function toggleGesture() {
  return { type: TOGGLE_GESTURE };
};

export function toggleVoice() {
  return { type: TOGGLE_VOICE };
};

export function toggleSound() {
  return { type: TOGGLE_SOUND };
};

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