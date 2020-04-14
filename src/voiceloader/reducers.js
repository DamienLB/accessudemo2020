import React from 'react';
import { combineReducers } from 'redux';
import createReducer from './utils';
import {
  UPDATE_COMPONENTS,
  SAVE_SAMPLES,
  CLEAR_SAMPLES,
  MODEL_READY,
  MODEL_NOT_READY,
  MODEL_SAVED,
  MODEL_NOT_SAVED,
  NEXT_SAMPLE,
  SHOW_TRAINER,
  SAMPLE_NOISE,
  DONE_SAMPLE_NOISE,
  READY_TO_TRAIN,
  TRAINING,
  DONE_TRAINING,
  ENABLE_NEXT,
  DISABLE_NEXT,
} from './actions';


const components = createReducer([], {
  [UPDATE_COMPONENTS]: (state, action) => {
    return action.components;
  }
});

// const defaultapp = {component: () => { return (<div />)}, props: {}};
// const app = createReducer(defaultapp, {
//   [UPDATE_APP]: (state, action) => {
//     return action.app;
//   },
//   [NEXT_SAMPLE]: (state, action) => {
//     return defaultapp;
//   },
//   [CLEAR_SAMPLES]: (state, action) => {
//     return defaultapp;
//   },
// });

const samples = createReducer([], {
  [SAVE_SAMPLES]: (state, action) => {
    return state.concat(action.samples);
  },
});

const current = createReducer(0, {
  [NEXT_SAMPLE]: (state) => {
    return state + 1;
  },
});

const modelSaved = createReducer(false, {
  [MODEL_SAVED]: () => {
    return true;
  },
  [MODEL_NOT_SAVED]: () => {
    return false;
  }
});

const showTrainer = createReducer(false, {
  [SHOW_TRAINER]: () => {
    return true;
  },
});

const samplingNoise = createReducer(false, {
  [SAMPLE_NOISE]: () => {
    return true;
  },
  [DONE_SAMPLE_NOISE]: () => {
    return false;
  },
});

const nextDisabled = createReducer(true, {
  [ENABLE_NEXT]: () => {
    return false;
  },
  [DISABLE_NEXT]: () => {
    return true;
  },
});

const trainMode = createReducer(0, {
  [READY_TO_TRAIN]: () => {
    return 1;
  },
  [TRAINING]: () => {
    return 2;
  },
  [DONE_TRAINING]: () => {
    return 3;
  },
});

const reducers = combineReducers({
  components,
  samples,
  modelSaved,
  current,
  showTrainer,
  samplingNoise,
  trainMode,
  nextDisabled,
});

export default reducers;
