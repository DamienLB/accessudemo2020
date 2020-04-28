import { TRAIN_GESTURE, TOGGLE_TRAIN_GESTURE, VIDEO_READY, TOGGLE_GESTURE, enableGesture, disableTrainGesture } from '../actions';
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
  const { trainGestureOn, gestureOn, trainingGestureCounts, gestureEnabled, trainGestureEnabled } = store.getState();

  const dispatchCmd = (cmd) => {
    if (gestureEnabled && !trainGestureEnabled) {
      console.log(cmd);
    }
  }

  // when the video element is ready save it for use by tensorflow.
  if (action.type === VIDEO_READY) {
    videoEl = action.videoEl;
  }

  // when user toggles to train gestures
  if (action.type === TOGGLE_TRAIN_GESTURE && !trainGestureOn) {
    // init tensorflow with video element
    initPromise(videoEl)
      .then(() => {
        predictPromise(dispatchCmd);
      });
  }

  // when user toggles to stop training gestures
  if (action.type === TOGGLE_TRAIN_GESTURE && trainGestureOn) {
    // stop training.
    stop();
  }

  // when user trains a gesture
  if (trainGestureOn && action.type === TRAIN_GESTURE) {
    // record and classify the gesture
    classifyPromise(action.gesture);

    // if the gesture is not yet enabled
    if (!gestureEnabled) {
      // test whether it should be enabled
      let gestureShouldBeEnabled = true;
      // check to see if every gesture has been trained at least 5 times
      for (const [key, count] of Object.entries(trainingGestureCounts)) {
        // if it hasn't, then don't enable gestures
        if (!gestureShouldBeEnabled || count < 5) {
          gestureShouldBeEnabled = false;
        }
      }
      // if so, enable gestures
      if (gestureShouldBeEnabled) {
        store.dispatch(enableGesture());
      }
    };
  }

  // disable train gesture after gesture is turned on
  if (action.type === TOGGLE_GESTURE && !gestureOn && trainGestureEnabled) {
    store.dispatch(disableTrainGesture());
  }

  console.log("dispatching action!");
  console.log(action);
  next(action);
};

export default gestureRecognition;
