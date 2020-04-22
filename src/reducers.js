import { combineReducers } from 'redux';
import { TRAIN_GESTURE, UPDATE_NOTIFCATION, TOGGLE_SOUND, TOGGLE_VOICE, TOGGLE_TRAIN_GESTURE, TOGGLE_GESTURE, ENABLE_GESTURE } from './actions';
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
  [TOGGLE_TRAIN_GESTURE]: (state, action) => {
    return !state;
  },
});

const gestureOn = createReducer(false, {
  [TOGGLE_GESTURE]: (state, action) => {
    return !state;
  },
});

const gestureEnabled = createReducer(false, {
  [ENABLE_GESTURE]: (state, action) => {
    return true;
  },
});


const defaultCounts = {
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
  trainGestureOn,
  gestureOn,
  gestureEnabled,
  trainingGestureCounts,
});

export default reducers;
