import { RECORD_DND_ACTION, TOGGLE_TRAIN_GESTURE, VIDEO_READY } from '../actions';
import { classify, init, stop, predict } from '../lib/mobileNet';

let videoEl;
const gestureRecognition = store => next => action => {
  const { trainGestureOn, gestureOn } = store.getState();

  if (action.type === VIDEO_READY) {
    videoEl = action.videoEl;
  }

  if (action.type === TOGGLE_TRAIN_GESTURE && !trainGestureOn) {
    init(videoEl);
  }

  if (action.type === TOGGLE_TRAIN_GESTURE && trainGestureOn) {
    stop();
  }

  if (trainGestureOn && action.type === RECORD_DND_ACTION) {
    classify(action.action);
  }

  next(action);
};

export default gestureRecognition;
