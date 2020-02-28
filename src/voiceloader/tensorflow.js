import { eventChannel, END } from 'redux-saga'
/*
  LOADING Tensorflow via npm gave me issues, so I resorted to loading it directly in the browser as a script.
*/
// import * as tf from '@tensorflow/tfjs';
// import * as speechCommands from '@tensorflow-models/speech-commands';
import { NUM_FRAMES, SAMPLE_SIZE, INPUT_SHAPE, OUTPUT_SIZE } from './actions';

let recognizer;
let model;

export const stopListening = () => {
	if (recognizer.isListening()) {
		recognizer.stopListening();
		return;
  }
}

export const listen = () => {
  return eventChannel(emit => {
	 recognizer.listen(async ({spectrogram: {frameSize, data}}) => {
	   const vals = normalize(data.subarray(-frameSize * NUM_FRAMES));
	   const input = tf.tensor(vals, [1, ...INPUT_SHAPE]);
	   const probs = model.predict(input);
	   const predLabel = probs.argMax(1);
	   // console.log(predLabel);
	   const label = await predLabel.data();
	   /// STOPPING POINT!
	   // NEED TO read up on classification to figure out wheat to do on lines 24-30 
	   emit(label[0]);
	   tf.dispose([input, probs, predLabel]);
	 }, {
	   overlapFactor: 0.999,
	   includeSpectrogram: true,
	   invokeCallbackOnNoiseAndUnknown: true
	 });
	  // The subscriber must return an unsubscribe function
    return () => {
    	stopListening();
    }
  });
}

const getStorageKey = (name) => {
	return `localstorage://${name}`;
}

export const saveModel = async (name) => {
	const key = getStorageKey(name);
	await model.save(key);
}

export const loadModel = async (name) => {
	const key = getStorageKey(name);
	const models = await tf.io.listModels();
	const modelInfo = models[key];
	if (modelInfo) {
    model = await tf.loadLayersModel(key);
    return true
	}
	return false;
}

const flatten = (tensors) => {
 const size = tensors[0].length;
 const result = new Float32Array(tensors.length * size);
 tensors.forEach((arr, i) => result.set(arr, i * size));
 return result;
}

export const train = async (examples) => {
	console.log('tf train in action');
	const ys = tf.oneHot(examples.map(e => e.label), 3);
	const xsShape = [examples.length, ...INPUT_SHAPE];
	const xs = tf.tensor(flatten(examples.map(e => e.vals)), xsShape);

	await model.fit(xs, ys, {
	 batchSize: 16,
	 epochs: 20,
	 callbacks: {
	   onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
	 }
	});
	tf.dispose([xs, ys]);
	return true;
}

const normalize = (x) => {
 const mean = -100;
 const std = 10;
 return x.map(x => (x - mean) / std);
}

export const collectSample = (label, examples) => {
 if (recognizer.isListening()) {
   return recognizer.stopListening(); // stops on second call
 }
 if (label == null) {
   return;
 }
 recognizer.listen(async ({spectrogram: {frameSize, data}}) => {
   let vals = normalize(data.subarray(-frameSize * NUM_FRAMES));
   examples.push({vals, label});
 }, {
   overlapFactor: 0.999,
   includeSpectrogram: true,
   invokeCallbackOnNoiseAndUnknown: true
 });
}

const buildModel = () => {
 model = tf.sequential();
 model.add(tf.layers.depthwiseConv2d({
   depthMultiplier: 8,
   kernelSize: [NUM_FRAMES, 3],
   activation: 'relu',
   inputShape: INPUT_SHAPE
 }));
 model.add(tf.layers.maxPooling2d({poolSize: [1, 2], strides: [2, 2]}));
 model.add(tf.layers.flatten());
 model.add(tf.layers.dense({units: OUTPUT_SIZE, activation: 'softmax'}));
 const optimizer = tf.train.adam(0.01);
 model.compile({
   optimizer,
   loss: 'categoricalCrossentropy',
   metrics: ['accuracy']
 });
}

export const initTensorFlow = async () => {
 recognizer = speechCommands.create('BROWSER_FFT');
 await recognizer.ensureModelLoaded();
 buildModel();
}
