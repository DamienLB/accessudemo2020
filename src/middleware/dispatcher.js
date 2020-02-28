let timeout;
let timedOut;


export const appDispatcher = store => next => action => {
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
