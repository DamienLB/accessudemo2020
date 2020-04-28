import { select, race, take, put, takeEvery, all, fork, call, cancel, cancelled, spawn } from 'redux-saga/effects';
import { VIDEO_READY} from '../actions';
import { classify, init, stop, predict } from '../lib/mobileNet';


function* readyTrain() {
  const { videoEl } = yield take(VIDEO_READY);

}


export default function* rootSaga() {
  yield all([
    readyTrain(),
  ])
}