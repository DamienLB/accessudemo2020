/*
 * action types
 */

export const COMMANDS = ['left', 'right', 'up', 'down', 'next', 'prev'];
export const NUM_FRAMES = 3;
export const OUTPUT_SIZE = COMMANDS.length + 1;
export const INPUT_SHAPE = [NUM_FRAMES, 232, 1];
export const MODEL_NAME = 'voiceloader-model';
export const MODEL_NAME_COMPONENTS = `${MODEL_NAME}-components`;

/*
 * action types
 */
export const UPDATE_COMPONENTS = 'UPDATE_COMPONENTS';
export const UPDATE_APP = 'UPDATE_APP';
export const SAVE_SAMPLES = 'SAVE_SAMPLES';
export const SAVE_MODEL = 'SAVE_MODEL';
export const MODEL_SAVED = 'MODEL_SAVED';
export const MODEL_NOT_SAVED = 'MODEL_NOT_SAVED';
export const NEXT_SAMPLE = 'NEXT_SAMPLE';
export const CAPTURE_SAMPLE = 'CAPTURE_SAMPLE';
export const SHOW_TRAINER = 'SHOW_TRAINER';
export const SAMPLE_NOISE = 'SAMPLE_NOISE';
export const DONE_SAMPLE_NOISE = 'DONE_SAMPLE_NOISE';
export const READY_TO_TRAIN = 'READY_TO_TRAIN';
export const TRAINING = 'TRAINING';
export const DONE_TRAINING = 'DONE_TRAINING';
export const TRAIN = 'TRAIN';
export const ENABLE_NEXT = 'ENABLE_NEXT';
export const DISABLE_NEXT = 'DISABLE_NEXT';


/*
 * action creators
 */

export function enableNext() {
  return { type: ENABLE_NEXT };
}

export function disableNext() {
  return { type: DISABLE_NEXT };
}

export function saveModel() {
  return { type: SAVE_MODEL };
}

export function train() {
  return { type: TRAIN };
}

export function readyToTrain() {
  return { type: READY_TO_TRAIN };
}

export function training() {
  return { type: TRAINING };
}

export function doneTraining() {
  return { type: DONE_TRAINING };
}

export function samplingNoise() {
  return { type: SAMPLE_NOISE };
}

export function doneSamplingNoise() {
  return { type: DONE_SAMPLE_NOISE };
}

export function updateComponents(components) {
  return { type: UPDATE_COMPONENTS, components };
}

export function updateApp(component, props) {
  return { type: UPDATE_APP, app: { component, props } };
}

export function captureSample(label) {
  return { type: CAPTURE_SAMPLE, label };
}

export function saveSamples(samples) {
  return { type: SAVE_SAMPLES, samples };
}

export function modelSaved() {
  return { type: MODEL_SAVED };
}

export function modelNotSaved() {
  return { type: MODEL_NOT_SAVED };
}

export function nextSample() {
  return { type: NEXT_SAMPLE };
}

export function showTrainer() {
  return { type: SHOW_TRAINER };
}
