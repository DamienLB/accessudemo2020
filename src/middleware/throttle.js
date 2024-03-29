import { UPDATE_NOTIFCATION } from '../actions';
let timeout;
let timedOut;


const throttle = store => next => action => {
  return next(action);
  if (action.type !== UPDATE_NOTIFCATION) {
    return next(action);
  }

  if (action.priority) {
  	clearTimeout(timeout);
  	timedOut = false;
  }

  if (!timedOut) {
  	timedOut = true;
  	next(action);
  	timeout = setTimeout(() => {
  		timedOut = false;
    }, 50);
  }
};

export default throttle;
