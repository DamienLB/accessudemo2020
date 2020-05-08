import { fork, take, put, all, call, select, cancel, delay } from 'redux-saga/effects';
import {
  VIDEO_READY,
  TRAIN_ON,
  TRAIN_OFF,
  TRAIN,
  ENABLE_GESTURE,
  GESTURE,
  DESIRED_COUNT_EACH,
  enableGesture,
  gestureCommandFor,
  gestureCommand,
} from '../actions';
import { classify, init, webcamstop, webcamstart, predict } from '../lib/mobileNet';



let videoElement;
function* readyTrain() {
  const { videoEl } = yield take(VIDEO_READY);
  videoElement = videoEl;
  yield take(TRAIN_ON);
  yield call(init, videoEl);
  while(true) {
    yield take(TRAIN_OFF);
    yield webcamstop();
    yield take(TRAIN_ON);
    yield webcamstart();
  }
}

function* train() {
  while(true) {
    const { gesture } = yield take(TRAIN);
    yield call(classify, gesture);

    const { gestureEnabled, trainingGestureCounts } = yield select();

    // if the gesture is not yet enabled
    if (!gestureEnabled) {
      // test whether it should be enabled
      let gestureShouldBeEnabled = true;
      // check to see if every gesture has been trained at least 5 times
      for (const [key, count] of Object.entries(trainingGestureCounts)) {
        // if it hasn't, then don't enable gestures
        if (!gestureShouldBeEnabled || count < DESIRED_COUNT_EACH) {
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

function* log(action) {
  const { gestureOn } = yield select();
  if (gestureOn) {
    switch(action) {
      case 'Pickup Mouse':
        yield put(gestureCommandFor('mouse'));
        break;
      case 'Pickup Cat':
        yield put(gestureCommandFor('cat'));
        break;
      case 'Pickup Cheese':
        yield put(gestureCommandFor('cheese'));
        break;
      case 'Left':
        yield put(gestureCommand('left'));
        break;
      case 'Right':
        yield put(gestureCommand('right'));
        break;
      case 'Up':
        yield put(gestureCommand('up'));
        break;
      case 'Down':
        yield put(gestureCommand('down'));
        break;
      case 'Drop':
        yield put(gestureCommand('drop'));
        break;
    }
  }
}

function* disableTrainingWhenReady() {
  yield take(ENABLE_GESTURE);
  yield take(GESTURE);
  while(true) {
    const prediction = yield call(predict);
    yield call(log, prediction);
    yield delay(700);
    yield put(gestureCommand(''));
  }

  // while(true) {
  //   yield take(GESTURE_OFF);
  //   yield webcamstop();
  //   yield take(GESTURE_ON);
  //   yield init(videoElement);
  // }
}


export default function* rootSaga() {
  yield all([
    disableTrainingWhenReady(),
    readyTrain(),
    train(),
  ])
}