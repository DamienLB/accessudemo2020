import { combineReducers } from 'redux';
import {
  DEFAULT_COUNTS,
  UPDATE_NOTIFCATION,
  SOUND,
  EFFECTMODE,
  NATEFFECTMODE,
  SYNTHEFFECTMODE,
  VOICE,
  TRAIN_ON,
  TRAIN_OFF,
  ENABLE_GESTURE,
  GESTURE,
  TRAIN,
  GESTURE_COMMAND,
  INFO_ON,
  INFO_OFF,
  } from './actions';
import { createReducer } from './utils';


const infoOn = createReducer(false, {
  [INFO_ON]: (state, action) => {
    return true;
  },
  [INFO_OFF]: (state, action) => {
    return false;
  },
});

const infoText = createReducer('', {
  [INFO_ON]: (state, action) => {
    return action.text;
  },
});

const infoCloseFnc = createReducer('', {
  [INFO_ON]: (state, action) => {
    return action.closefnc;
  },
});

const notification = createReducer('', {
  [UPDATE_NOTIFCATION]: (state, action) => {
    return action.string;
  },
});

const soundOn = createReducer(false, {
  [SOUND]: (state, action) => {
    return action.on;
  },
});

const effectModeOn = createReducer(false, {
  [EFFECTMODE]: (state, action) => {
    return action.on;
  },
  [NATEFFECTMODE]: (state, action) => {
    return false;
  },
  [SYNTHEFFECTMODE]: (state, action) => {
    return true;
  },
});

const voiceOn = createReducer(false, {
  [VOICE]: (state, action) => {
    return action.on;
  },
});

const trainGestureOn = createReducer(false, {
  [TRAIN_ON]: (state, action) => {
    return true;
  },
  [TRAIN_OFF]: (state, action) => {
    return false;
  }
});

const gestureEnabled = createReducer(false, {
  [ENABLE_GESTURE]: (state, action) => {
    return true;
  }
});

const gestureOn = createReducer(false, {
  [GESTURE]: (state, action) => {
    return action.on;
  }
});

const trainingGestureCounts = createReducer(DEFAULT_COUNTS, {
  [TRAIN]: (state, action) => {
    const newcount = state[action.gesture] + 1;
    const newstate = Object.assign({}, state, { [action.gesture]: newcount });
    return newstate;
  },
});

const command = createReducer('', {
  [GESTURE_COMMAND]: (state, action) => {
    return action.cmd;
  },
});

const commandFor = createReducer('', {
  [GESTURE_COMMAND]: (state, action) => {
    if (action.thing) return action.thing;
    return state;
  },
});

const reducers = combineReducers({
  notification,
  soundOn,
  effectModeOn,
  voiceOn,
  gestureOn,
  gestureEnabled,
  trainGestureOn,
  trainingGestureCounts,
  command,
  commandFor,
  infoOn,
  infoText,
  infoCloseFnc,
});

export default reducers;
