import { combineReducers } from 'redux';
import { UPDATE_NOTIFCATION } from './actions';
import { createReducer } from './utils';


const notification = createReducer('', {
  [UPDATE_NOTIFCATION]: (state, action) => {
    return action.string;
  },
});

const reducers = combineReducers({
  notification,
});

export default reducers;
