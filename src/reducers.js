import { combineReducers } from 'redux';
import { UPDATE_NOTIFCATION, TOGGLE_SOUND } from './actions';
import { createReducer } from './utils';


const notification = createReducer('', {
  [UPDATE_NOTIFCATION]: (state, action) => {
    return action.string;
  },
});

const soundOn = createReducer(true, {
  [TOGGLE_SOUND]: (state, action) => {
    return !state;
  },
});

const reducers = combineReducers({
  notification,
  soundOn,
});

export default reducers;
