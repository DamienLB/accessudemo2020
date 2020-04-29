import { select, race, take, put, takeEvery, all, fork, call, cancel, cancelled, spawn } from 'redux-saga/effects';
import {
  VIDEO_READY,
  TRAIN_GESTURE_ON,
  TRAIN_GESTURE_OFF,
  TRAIN_GESTURE,
  ENABLE_GESTURE,
  GESTURE_ON,
  enableGesture,
  disableTrainGesture,
} from '../actions';
import { classify, init, stop, predict } from '../lib/mobileNet';


function* readyTrain() {
  const { videoEl } = yield take(VIDEO_READY);
  while(true) {
    yield take(TRAIN_GESTURE_ON);
    yield call(init, videoEl);
    yield take(TRAIN_GESTURE_OFF);
    yield stop();
  }
}

function* train() {
  while(true) {
    const { gesture } = yield take(TRAIN_GESTURE);
    yield call(classify, gesture);

    const { gestureEnabled, trainingGestureCounts } = yield select();

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
        yield put(enableGesture());
      }
    };
  }
}

function* disableTrainingWhenReady() {
  yield take(ENABLE_GESTURE);
  yield take(GESTURE_ON);
  yield put(disableTrainGesture());
}


export default function* rootSaga() {
  yield all([
    disableTrainingWhenReady(),
    readyTrain(),
    train(),
  ])
}