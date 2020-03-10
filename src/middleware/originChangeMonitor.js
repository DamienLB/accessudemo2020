import { CHECK_ORIGIN_CHANGES, INIT } from '../actions';


const originChangeMonitor = store => next => action => {
  if (action.type === INIT) {
    const area = document.querySelector('dnd-area');
    console.log(area);
  }

  if (action.type === CHECK_ORIGIN_CHANGES) {
    const { tokenOrigin, targetOrigins } = action;
    const closestDistance = targetOrigins.reduce((result, origin) => {
      const distance = Math.sqrt( Math.pow((tokenOrigin.originX - origin.originX), 2) + Math.pow((tokenOrigin.originY - origin.originY), 2) );
      return (!result && distance) || (distance < result && distance) || result;
    }, false);
    console.log(closestDistance);
  }
  next(action);
};

export default originChangeMonitor;
