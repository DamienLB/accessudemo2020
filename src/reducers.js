import { combineReducers } from 'redux';
import { UPDATE_NOTIFCATION, TOGGLE_SOUND, TOGGLE_VOICE, TOGGLE_TRAIN_GESTURE, TOGGLE_GESTURE, ENABLE_GESTURE } from './actions';
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

const reducers = combineReducers({
  notification,
  soundOn,
  voiceOn,
  trainGestureOn,
  gestureOn,
  gestureEnabled,
});

export default reducers;
