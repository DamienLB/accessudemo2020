import { take, put, all, select, fork, cancel } from 'redux-saga/effects';
import { CHECK_ORIGIN_CHANGES, INIT, OBJECT_DROPPED, SOUND } from '../actions';
import { initiate, mkSound, stopSound, adjustSound } from '../lib/sound';


const calculateDistance = (tokenOrigin, targetOrigins) => {
  return targetOrigins.reduce((result, origin) => {
    const distance = Math.sqrt(Math.pow((tokenOrigin.originX - origin.originX), 2) + Math.pow((tokenOrigin.originY - origin.originY), 2));
    return (!result && distance) || (distance < result && distance) || result;
  }, false);  
}

function* differentiateSound(effectModeOn) {
  while(true) {
    try{
      const { tokenOrigin, targetOrigins, thing } = yield take(CHECK_ORIGIN_CHANGES);
      const closestDistance = calculateDistance(tokenOrigin, targetOrigins);
      adjustSound(closestDistance, effectModeOn);
    }catch(e) {
      console.error(e);
    }
  }
}

function* originChange() {
  while(true) {
    try {
      const { tokenOrigin, targetOrigins, thing } = yield take(CHECK_ORIGIN_CHANGES);
      const { effectModeOn } = yield select();
      const closestDistance = calculateDistance(tokenOrigin, targetOrigins);
      mkSound(closestDistance, thing, effectModeOn);
      const task = yield fork(differentiateSound, effectModeOn);
      yield take(OBJECT_DROPPED);
      yield cancel(task);
      stopSound(effectModeOn);   
    }catch(e) {
      console.error(e);
    } 
  }
}

function* toggleSound() {
  while(true) {
    yield take(SOUND);
    const { soundOn } = yield select();
    if (soundOn) {
      const task = yield fork(originChange);
      yield take(SOUND);
      yield cancel(task);
    }
  }
}


function* init() {
  yield take(INIT);
  const area = document.querySelector('dnd-area');
  const { w, h } = area.getShape();
  initiate(w, h);
}

export default function* rootSaga() {
  yield all([
    init(),
    toggleSound(),
  ])
};
