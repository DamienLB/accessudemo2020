import { all } from 'redux-saga/effects';
import gestureRecog from './gestureRecog';
import audio from './audio';

export default function* rootSaga() {
  yield all([
    gestureRecog(),
    audio(),
  ])
}