import { fork, take, put, all, takeLatest, call, select, cancel, delay } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import {
  VIDEO_READY,
  TRAIN_GESTURE_ON,
  TRAIN_GESTURE_OFF,
  TRAIN_GESTURE,
  ENABLE_GESTURE,
  GESTURE_ON,
  GESTURE_OFF,
  enableGesture,
  disableTrainGesture,
  gestureCommandFor,
  gestureCommand,
} from '../actions';
import { classify, init, webcamstop, webcamstart, predict } from '../lib/mobileNet';



function predictEmitter() {
  return eventChannel(emit => {
      predict(emit);
      return () => {};
    }
  )
}

let videoElement;
function* readyTrain() {
  const { videoEl } = yield take(VIDEO_READY);
  videoElement = videoEl;
  yield take(TRAIN_GESTURE_ON);
  yield call(init, videoEl);
  while(true) {
    yield take(TRAIN_GESTURE_OFF);
    yield webcamstop();
    yield take(TRAIN_GESTURE_ON);
    yield webcamstart();
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

function* log(action) {
  const { gestureOn } = yield select();
  if (gestureOn) {
    switch(action) {
      case 'Pickup Mouse':
        yield put(gestureCommandFor('mouse'));
        yield delay(50);
        yield put(gestureCommand('pick up'));
        break;
      case 'Pickup Cat':
        yield put(gestureCommandFor('cat'));
        yield delay(50);
        yield put(gestureCommand('pick up'));
        break;
      case 'Pickup Cheese':
        yield put(gestureCommandFor('cheese'));
        yield delay(50);
        yield put(gestureCommand('pick up'));
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
    console.log(action);
  }
}

function* disableTrainingWhenReady() {
  yield take(ENABLE_GESTURE);
  yield take(GESTURE_ON);
  yield put(disableTrainGesture());
  // const chan = yield call(predictEmitter);
  // yield takeLatest(chan, log);
  while(true) {
    const prediction = yield call(predict);
    yield call(log, prediction);
    yield delay(100);
    yield put(gestureCommand(''));
    yield delay(700);
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