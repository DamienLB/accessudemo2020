import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';


let net;
let webcam;
const classifier = knnClassifier.create();
const predictionOff = true;

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
    webcam = await tf.data.webcam(videoEl);
  }
}

export function stop() {
  if (net) {
    net = null;
    webcam.stop();
  }
}

export async function predict(showResult) {
  if (predictionOff) {
    predictionOff = false;
    while (true) {
        const img = await webcam.capture();
        const activation = net.infer(img, 'conv_preds');
        // Get the most likely class and confidences from the classifier module.
        const result = await classifier.predictClass(activation);
        showResult(result.label);
        // Dispose the tensor to release the memory.
        img.dispose();
      }
      // Give some breathing room by waiting for the next animation frame to
      // fire.
      await tf.nextFrame();
  }
}
