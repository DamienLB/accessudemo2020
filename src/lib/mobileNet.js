import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';


let net;
let webcam;
const classifier = knnClassifier.create();

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
  if (!net) {
    net = await mobilenet.load();
  }
  if (!webcam) {
    const video = videoEl;
    webcam = await tf.data.webcam(videoEl);
  }
}

export function webcamstop() {
  if (webcam) {
    webcam.stop();
  }
}

export function webcamstart() {
  if (webcam) {
    webcam.start();
  }
}

// export async function predict(showResult) {
//   let cmd;
//   while (true) {
//     const img = await webcam.capture();
//     const activation = net.infer(img, 'conv_preds');
//     // Get the most likely class and confidences from the classifier module.
//     const result = await classifier.predictClass(activation);
//     if (result.label !== cmd) {
//       cmd = result.label;
//       showResult(cmd);
//     }
//     // Dispose the tensor to release the memory.
//     img.dispose();
//     // Give some breathing room by waiting for the next animation frame to
//     // fire.
//     await tf.nextFrame();
//   }
// }


export async function predict() {
  const img = await webcam.capture();
  const activation = net.infer(img, 'conv_preds');
  // Get the most likely class and confidences from the classifier module.
  const result = await classifier.predictClass(activation);
  // Dispose the tensor to release the memory.
  img.dispose();
  return result.label;
}
