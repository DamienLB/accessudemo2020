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

const VIDEO = {};
function* readyTrain() {
  const { videoEl, name } = yield take(VIDEO_READY);
  VIDEO[name] = videoEl;
  const { videoEl: videoEl2, name: name2 } = yield take(VIDEO_READY);
  VIDEO[name2] = videoEl2;
  while(true) {
    yield take(TRAIN_ON);
    yield call(init, VIDEO['panel']);
    webcamstart();
    const trainTask = yield fork(train);
    yield take(TRAIN_OFF);
    yield cancel(trainTask);
    const { gestureOn } = yield select();
    if (!gestureOn) yield call(webcamstop);
  }
}

function* readyPredict() {
  yield take(ENABLE_GESTURE);
  while(true) {
    yield take(GESTURE);
    yield call(init, VIDEO['app']);
    yield webcamstart();
    const predictTask = yield fork(predictCommand);
    yield take(GESTURE);
    yield cancel(predictTask);
    const { trainGestureOn } = yield select();
    if (!trainGestureOn) yield call(webcamstop);
  }
}

function* predictCommand () {
  while(true) {
    try {
      const prediction = yield call(predict);
      yield call(log, prediction);
      yield delay(700);
      yield put(gestureCommand(''));
    } catch (e) {
      console.error(e);
    }
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

export default function* rootSaga() {
  yield all([
    readyTrain(),
    readyPredict(),
  ])
}