import React from 'react';
import { select, all, put, call, take, fork, delay } from 'redux-saga/effects';
import filter from 'lodash.filter';
import queryString from 'query-string';
import {
	initTensorFlow,
	collectSample,
	train,
	saveModel,
	loadModel,
	listen,
	stopListening
} from './tensorflow';
import {
	updateComponents,
	updateApp,
	showTrainer,
	saveSamples,
	samplingNoise,
	doneSamplingNoise,
	readyToTrain,
	training,
	doneTraining,
	modelSaved,
	enableNext,
	disableNext,
	MODEL_NAME,
	MODEL_NAME_COMPONENTS,
	COMMANDS,
	OUTPUT_SIZE,
	NEXT_SAMPLE,
	CAPTURE_SAMPLE,
	SAVE_SAMPLES,
	SAVE_MODEL,
	TRAIN,
} from './actions';

const getLocation = () => {
	const port = location.port ? `:${location.port}` : '';
	return `${window.location.protocol}//${window.location.hostname}${port}${window.location.pathname}`;
}

function* loadComponentsFromStorage() {
	const jsonComponents = localStorage.getItem(MODEL_NAME_COMPONENTS);
	const components = JSON.parse(jsonComponents);
	console.log(components);
	yield put(updateComponents(components));
}

async function getComponent(index) {
  const component = await window.Savi.getComponent(index);
  return component;
}

// function* setComponent() {
// 	const { current, components } = yield select();
// 	const appname = components[current];
// 	console.log(`Displaying ${appname}`);
// 	yield put(updateApp(Component, props));
// }

function* watchToReadyTrain() {
  while (true) {
	  yield take(SAVE_SAMPLES);
	  const { current, components } = yield select();
	  if (current === components.length - 1) {
      yield put(readyToTrain());
	  }
  }
}

function* watchSaveModel() {
  while (true) {
	  yield take(SAVE_MODEL);
	  localStorage.clear();
	  const { components } = yield select();
	  yield call(saveModel, MODEL_NAME);
	  localStorage.setItem(MODEL_NAME_COMPONENTS, JSON.stringify(components));
    yield put(modelSaved());
    const url = getLocation();
    location.href = url; // after saving redirect to normal mode.
  }
}

function* watchForTrain() {
	while(true) {
		yield take(TRAIN);
		yield put(training());
		const { samples } = yield select();
		yield call(train, samples);
		yield put(doneTraining());
	}
}

function* watchForNext() {
	while(true) {
		yield take(CAPTURE_SAMPLE);
		yield put(enableNext());
		yield take(NEXT_SAMPLE);
		yield put(disableNext());
		// yield call(setComponent);
	}
}

function* sampleNoise() {
  const samples = [];
  yield put(samplingNoise());
	// OUTPUT_SIZE is the total nuber of apps we're training + 1
	// We add one to provide for a "noise" label - so that the machine recognizes when nothing important is being said
  const noiseLabel = OUTPUT_SIZE
	yield call(collectSample, noiseLabel, samples); // collect noise
	yield delay(1500);
  yield call(collectSample); // stop the noise sampling
	yield put(saveSamples(samples)); // save the noise sampling
  yield put(doneSamplingNoise());
}

function* watchCaptureSample() {
	while(true) {
		const samples = []; // reset to save
		const { label } = yield take(CAPTURE_SAMPLE); // now we're pressing the button to sample
		yield call(collectSample, label, samples); //start recording
		yield take(CAPTURE_SAMPLE); // the capture button has been released
		yield call(collectSample); // stop recording
		yield put(saveSamples(samples));
		yield fork(sampleNoise);
	}
}

function* initTrainer() {
	yield put(updateComponents(COMMANDS));
  // yield call(setComponent);

	yield put(showTrainer()); // training mode ON
	yield all([
		watchCaptureSample(),
		watchForNext(),
    watchToReadyTrain(),
    watchForTrain(),
    watchSaveModel(),
	]);	
}

function* listenToChanges(chan) {
	while(true) {
		const result = yield take(chan);
		console.log(result);
	}
}

function* init() {
	// eslint-disable-next-line no-undef
	// taken from savi-loader; not sure if still needed for jmol
	if (window.System !== undefined) { // jmol breaks when polyfill is added; this addresses that bug; see SAVI-3924 for details
	  // eslint-disable-next-line no-undef
	  delete window.System;
	}
  // initate tensorflow setup
  yield call(initTensorFlow);

  // check if we're in training mode
  const GET = queryString.parse(location.search);
  if (GET.train) {
  	yield fork(initTrainer);
  	return;
  }

  const modelLoaded = yield call(loadModel, MODEL_NAME);
  if (!modelLoaded) {
  	// if no model loaded, go to train mode
  	const url = getLocation();
  	location.href = `${url}?train=true`;
  	return;
  }
  yield call(loadComponentsFromStorage);
  // yield call(setComponent);
  const chan = yield call(listen);
  yield fork(listenToChanges, chan);
}

export default function* rootSaga() {
  yield all([
    init(),
  ]);
}
