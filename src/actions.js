/*
 * action types
 */

export const UPDATE_NOTIFCATION = 'UPDATE_NOTIFCATION';
export const CHECK_ORIGIN_CHANGES = 'CHECK_ORIGIN_CHANGES';
export const OBJECT_DROPPED = 'OBJECT_DROPPED';
export const TOGGLE_SOUND = 'TOGGLE_SOUND';
export const TOGGLE_VOICE = 'TOGGLE_VOICE';

export const ENABLE_TRAIN_GESTURE = 'ENABLE_TRAIN_GESTURE';
export const DISABLE_TRAIN_GESTURE = 'DISABLE_TRAIN_GESTURE';
export const TRAIN_GESTURE_ON = 'TRAIN_GESTURE_ON';
export const TRAIN_GESTURE_OFF = 'TRAIN_GESTURE_OFF';

export const ENABLE_GESTURE = 'ENABLE_GESTURE';
export const DISABLE_GESTURE = 'DISABLE_GESTURE';
export const GESTURE_ON = 'GESTURE_ON';
export const GESTURE_OFF = 'GESTURE_OFF';

export const VIDEO_READY = 'VIDEO_READY';
export const TRAIN_GESTURE = 'TRAIN_GESTURE';
export const INIT = 'INIT';

export const GESTURE_COMMAND = 'GESTURE_COMMAND';
export const GESTURE_COMMAND_FOR = 'GESTURE_COMMAND_FOR';


/*
 * other constants
 */

/*
 * action creators
 */

export function gestureCommandFor(thing) {
  return { type: GESTURE_COMMAND_FOR, thing };
};

export function gestureCommand(cmd) {
  return { type: GESTURE_COMMAND, cmd };
};

export function trainGestureOn() {
  return { type: TRAIN_GESTURE_ON };
};

export function trainGestureOff() {
  return { type: TRAIN_GESTURE_OFF };
};

export function gestureOn() {
  return { type: GESTURE_ON };
};

export function gestureOff() {
  return { type: GESTURE_OFF };
};

export function trainGesture(gesture) {
  return { type: TRAIN_GESTURE, gesture };
};

export function enableGesture() {
  return { type: ENABLE_GESTURE };
};

export function disableGesture() {
  return { type: DISABLE_GESTURE };
};

export function enableTrainGesture() {
  return { type: ENABLE_TRAIN_GESTURE };
};

export function disableTrainGesture() {
  return { type: DISABLE_TRAIN_GESTURE };
};


export function videoReady(videoEl) {
  return { type: VIDEO_READY, videoEl };
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

export function checkOriginChanges(tokenOrigin, targetOrigins, thing) {
  return { type: CHECK_ORIGIN_CHANGES, tokenOrigin, targetOrigins, thing };
};
