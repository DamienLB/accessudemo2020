import { combineReducers } from 'redux';
import {
  UPDATE_NOTIFCATION,
  SOUND,
  EFFECTMODE,
  VOICE,
  TRAIN_ON,
  TRAIN_OFF,
  ENABLE_GESTURE,
  GESTURE,
  TRAIN,
  GESTURE_COMMAND,
  GESTURE_COMMAND_FOR,
  INFOBOX_ON,
  INFOBOX_OFF,
  } from './actions';
import { createReducer } from './utils';


const infoOn = createReducer(false, {
  [INFOBOX_ON]: (state, action) => {
    return true;
  },
  [INFOBOX_OFF]: (state, action) => {
    return false;
  },
});

const infoText = createReducer('', {
  [INFOBOX_ON]: (state, action) => {
    return action.text;
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

const gestureEnabled = createReducer(true, {
  [ENABLE_GESTURE]: (state, action) => {
    return true;
  }
});

const gestureOn = createReducer(false, {
  [GESTURE]: (state, action) => {
    return action.on;
  }
});


const defaultCounts = {
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

const trainingGestureCounts = createReducer(defaultCounts, {
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
  [GESTURE_COMMAND_FOR]: (state, action) => {
    return action.thing;
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
  trainGestureEnabled,
  trainingGestureCounts,
  command,
  commandFor,
  infoOn,
  infoText,
});

export default reducers;
