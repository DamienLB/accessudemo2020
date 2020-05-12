export const DEFAULT_COUNTS = {
  'Do Nothing': 0,
  'Pickup Mouse': 0,
  'Pickup Cat': 0,
  'Pickup Cheese': 0,
  'Left': 0,
  'Right': 0,
  'Down': 0,
  'Up': 0,
  'Drop': 0,
};

export const DESIRED_COUNT_EACH = 6;
export const DESIRED_COUNT_COMPLETE = Object.values(DEFAULT_COUNTS).length * DESIRED_COUNT_EACH;

/*
 * action types
 */


// sonification on/off
export const SOUND = 'SOUND';
// sonification mode
export const EFFECTMODE = 'EFFECTMODE';
export const NATEFFECTMODE = 'NATEFFECTMODE';
export const SYNTHEFFECTMODE = 'SYNTHEFFECTMODE';

// voice mode on/off
export const VOICE = 'VOICE';
// gesture mode on/off
export const GESTURE = 'GESTURE';

// train gesture mode on
export const TRAIN_ON = 'TRAIN_ON';
// train gesture mode on
export const TRAIN_OFF = 'TRAIN_OFF';


export const INFO_ON = 'INFO_ON';
export const INFO_OFF = 'INFO_OFF';

// enable gesture mode
export const ENABLE_GESTURE = 'ENABLE_GESTURE';

// train gesture
export const TRAIN = 'TRAIN';
// updates notif at bottom of screen when items move
export const UPDATE_NOTIFCATION = 'UPDATE_NOTIFCATION';

// for sonification
export const CHECK_ORIGIN_CHANGES = 'CHECK_ORIGIN_CHANGES';

// object is dropped - for sonification
export const OBJECT_DROPPED = 'OBJECT_DROPPED';

export const VIDEO_READY = 'VIDEO_READY';
export const INIT = 'INIT';

export const GESTURE_COMMAND = 'GESTURE_COMMAND';
export const REGISTER_TOKEN = 'REGISTER_TOKEN';


export const toggle = (fortoggle, current) => {
  let type;
  switch(fortoggle) {
    case "sonification_onoff":
        type = SOUND;
      break
    case "effectmode":
        type = EFFECTMODE;
      break
    case "voice_onoff":
        type = VOICE;
      break
    case "gesture_onoff":
        type = GESTURE;
      break
  }
  if (!type) throw `invalid type fortoggle ${fortoggle}`;
  const on = !current;
  return { type, on };
}

export function natEffectOn() {
  return { type: NATEFFECTMODE };
};

export function synthEffectOn() {
  return { type: SYNTHEFFECTMODE };
};

export function infoBoxOn(text) {
  return { type: INFO_ON, text };
};

export function infoBoxOff() {
  return { type: INFO_OFF };
};

export function enableGesture() {
  return { type: ENABLE_GESTURE };
};

export function trainModeOn() {
  return { type: TRAIN_ON };
};

export function trainModeOff() {
  return { type: TRAIN_OFF };
};

export function trainGesture(gesture) {
  return { type: TRAIN, gesture };
};

export function videoReady(videoEl, name) {
  return { type: VIDEO_READY, videoEl, name };
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

export function gestureCommand(cmd, thing) {
  return { type: GESTURE_COMMAND, cmd, thing };
};

export const registerToken = (el, thingtype) => {
  return { type: REGISTER_TOKEN, el, thingtype };
}

