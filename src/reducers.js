import { combineReducers } from 'redux';
import {
  TRAIN_GESTURE,
  UPDATE_NOTIFCATION,
  TOGGLE_SOUND,
  TOGGLE_VOICE,
  ENABLE_GESTURE,
  DISABLE_GESTURE,
  ENABLE_TRAIN_GESTURE,
  DISABLE_TRAIN_GESTURE,
  TRAIN_GESTURE_ON,
  TRAIN_GESTURE_OFF,
  GESTURE_ON,
  GESTURE_OFF,
  } from './actions';
import { createReducer } from './utils';


const notification = createReducer('', {
  [UPDATE_NOTIFCATION]: (state, action) => {
    return action.string;
  },
});

const soundOn = createReducer(false, {
  [TOGGLE_SOUND]: (state, action) => {
    return !state;
  },
});

const voiceOn = createReducer(false, {
  [TOGGLE_VOICE]: (state, action) => {
    return !state;
  },
});

const trainGestureOn = createReducer(false, {
  [TRAIN_GESTURE_ON]: (state, action) => {
    return true;
  },
  [TRAIN_GESTURE_OFF]: (state, action) => {
    return false;
  },
});

const trainGestureEnabled = createReducer(true, {
  [DISABLE_TRAIN_GESTURE]: (state, action) => {
    return false;
  },
  [ENABLE_TRAIN_GESTURE]: (state, action) => {
    return true;
  },
});

const gestureOn = createReducer(false, {
  [GESTURE_ON]: (state, action) => {
    return true;
  },
  [GESTURE_OFF]: (state, action) => {
    return false;
  },
});

const gestureEnabled = createReducer(false, {

  [TRAIN_GESTURE_ON]: (state, action) => {
    console.log("yo yoy yo ");
    return state;
  },

  [ENABLE_GESTURE]: (state, action) => {
    console.log("gesture enabled here!");
    return true;
  },
  [DISABLE_GESTURE]: (state, action) => {
    console.log("gesture disabled here!");
    return false;
  },
});


const defaultCounts = {
  'Do Nothing': 0,
  // 'Pickup Mouse': 0,
  // 'Pickup Cat': 0,
  // 'Pickup Cheese': 0,
  // 'Left': 0,
  // 'Right': 0,
  // 'Down': 0,
  // 'Up': 0,
  // 'Drop': 0,
};
const trainingGestureCounts = createReducer(defaultCounts, {
  [TRAIN_GESTURE]: (state, action) => {
    const newcount = state[action.gesture] + 1;
    const newstate = Object.assign({}, state, { [action.gesture]: newcount });
    return newstate;
  },
});

const reducers = combineReducers({
  notification,
  soundOn,
  voiceOn,
  gestureOn,
  gestureEnabled,
  trainGestureOn,
  trainGestureEnabled,
  trainingGestureCounts,
});

export default reducers;
