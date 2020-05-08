import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

let VIDEOEL;
let net;
let webcam;
let webcamplaying = false;
const classifier = knnClassifier.create();

// export const logwebcamplaying = () => {
//   console.log(webcamplaying);
//   console.log(net, webcam);
// };

export async function classify(id) {
  if (net && webcam) {
    // Capture an image from the web camera.
    const img = await webcam.capture();

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = net.infer(img, 'conv_preds');

    // Pass the intermediate activation to the classifier.
    classifier.addExample(activation, id);

    // Dispose the tensor to release the memory.
    img.dispose();
  }
}

export async function init(videoEl) {
  VIDEOEL = videoEl;
  if (!net) {
    net = await mobilenet.load();
  }
  if (!webcam) {
    const video = videoEl;
    webcam = await tf.data.webcam(videoEl);
    webcamplaying = true;
  }
}

export async function webcamstop() {
  if (webcam && webcamplaying) {
    await webcam.stop();
    webcamplaying = false;
  }
}

export async function webcamstart() {
  if (webcam) {
    if (!webcamplaying) {
      await webcam.start();
      webcamplaying = true;
    }
  }else{
    await init(VIDEOEL);
  }
}

export async function predict() {
  const img = await webcam.capture();
  const activation = net.infer(img, 'conv_preds');
  // Get the most likely class and confidences from the classifier module.
  const result = await classifier.predictClass(activation);
  // Dispose the tensor to release the memory.
  img.dispose();
  return result.label;
}
