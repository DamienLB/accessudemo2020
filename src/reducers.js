import { combineReducers } from 'redux';
import { UPDATE_NOTIFCATION, TOGGLE_SOUND, TOGGLE_VOICE } from './actions';
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

const reducers = combineReducers({
  notification,
  soundOn,
  voiceOn,
});

export default reducers;
