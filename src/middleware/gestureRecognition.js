import { TRAIN_GESTURE, TOGGLE_TRAIN_GESTURE, VIDEO_READY, TOGGLE_GESTURE, enableGesture } from '../actions';
import { classify, init, stop, predict } from '../lib/mobileNet';


const initPromise = (videoEl) => {
  return new Promise(() => {
    init(videoEl);
  });
};

const classifyPromise = (gesture) => {
  return new Promise(() => {
    classify(gesture);
  });
};

const predictPromise = () => {
  return new Promise(() => {
    predict(console.log);
  });
};

let videoEl;
const gestureRecognition = store => next => action => {
  const { trainGestureOn, gestureOn, trainingGestureCounts, gestureEnabled } = store.getState();

  if (action.type === VIDEO_READY) {
    videoEl = action.videoEl;
  }

  if (action.type === TOGGLE_TRAIN_GESTURE && !trainGestureOn) {
    initPromise(videoEl);
  }

  if (action.type === TOGGLE_TRAIN_GESTURE && trainGestureOn) {
    stop();
  }

  if (trainGestureOn && action.type === TRAIN_GESTURE) {
    classifyPromise(action.gesture);

    if (!gestureEnabled) {
      let gestureShouldBeEnabled = true;
      for (const [key, count] of Object.entries(trainingGestureCounts)) {
        if (!gestureShouldBeEnabled || count < 5) {
          gestureShouldBeEnabled = false;
        }
      }
      if (gestureShouldBeEnabled) {
        store.dispatch(enableGesture());
      }
    };
  }

  if (action.type === TOGGLE_GESTURE && !gestureOn) {
    console.log("here!!");
    predictPromise();
  }
  next(action);
};

export default gestureRecognition;
