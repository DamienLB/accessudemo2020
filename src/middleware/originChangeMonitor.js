import { CHECK_ORIGIN_CHANGES, INIT, OBJECT_DROPPED } from '../actions';
import { initiate, mkSound, stopSound } from '../lib/sound';

const originChangeMonitor = store => next => action => {
  if (action.type === INIT) {
    const area = document.querySelector('dnd-area');
    const { w, h } = area.getShape();
    initiate(w, h);
  }

  if (action.type === CHECK_ORIGIN_CHANGES) {
    const { tokenOrigin, targetOrigins } = action;
    const closestDistance = targetOrigins.reduce((result, origin) => {
      const distance = Math.sqrt(Math.pow((tokenOrigin.originX - origin.originX), 2) + Math.pow((tokenOrigin.originY - origin.originY), 2));
      return (!result && distance) || (distance < result && distance) || result;
    }, false);
    mkSound(closestDistance);
  }


  if (action.type === OBJECT_DROPPED) {
    stopSound();
  }

  next(action);
};

export default originChangeMonitor;
