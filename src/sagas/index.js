import { all } from 'redux-saga/effects';
import gestureRecog from './gestureRecog';

export default function* rootSaga() {
  yield all([
    gestureRecog(),
  ])
}