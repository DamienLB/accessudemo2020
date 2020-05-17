import range from 'lodash.range';
import mouse from '../assets/mouse.wav';
import cat from '../assets/cat.wav';
import cheese from '../assets/cheese.wav';


const sounds = {
  mouse,
  cat,
  cheese,
}

let AudioCtx;
let OscillatorNode
let GainNode;
let SoundPlaying = false;
let MaxDistance;
const Frequencies = [130.8, 138.6, 146.8, 155.6, 164.8, 174.6, 185.0, 196.0, 207.7, 220.0, 233.1, 246.9, 261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9, 523.3, 554.4, 587.3, 622.3, 659.3, 698.5, 740.0, 784.0, 830.6, 880.0, 932.3, 987.8, 1047, 1109, 1175, 1245, 1319, 1397];
const PlayBackRates = [.3, .4, .5, .6, .7, .9, 1.1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
let SND;

export const initiate = (areaWidth, areaHeight) => {
  MaxDistance = Math.sqrt(Math.pow(areaWidth, 2) + Math.pow(areaHeight, 2));
}

const getNormalizedFrequency = (distance) => {
  const ratio = distance/MaxDistance;
  const estindex = ratio * Frequencies.length;
  const index = Frequencies.length - Math.round(estindex) - 1;
  return Frequencies[index];
}

const getNormalizedPBR = (distance) => {
  const ratio = distance/MaxDistance;
  const estindex = ratio * PlayBackRates.length;
  const index = PlayBackRates.length - Math.round(estindex) - 1;
  return PlayBackRates[index];
}

const startSound = (thing, effectMode) => {
  if (!AudioCtx && effectMode) {
    AudioCtx = new AudioContext();
    OscillatorNode = AudioCtx.createOscillator();
    GainNode = AudioCtx.createGain();
    OscillatorNode.connect(GainNode);
    GainNode.connect(AudioCtx.destination);
    OscillatorNode.start();
  }
  if (!SoundPlaying) {
    SoundPlaying = true;
    if (effectMode) {
      GainNode.gain.exponentialRampToValueAtTime(
        1, AudioCtx.currentTime
      );
    } else {
      SND = new Audio(sounds[thing]);
      SND.loop = true;
      SND.play();     
    }
  }
}

export const stopSound = (effectMode) => {
  if (SoundPlaying) {
    SoundPlaying = false;
    if (effectMode) {
      GainNode.gain.exponentialRampToValueAtTime(
        0.00001, AudioCtx.currentTime + 0.1
      );
    } else {
      SND.pause();
    }
  }
}

export const adjustSound = (distance, effectMode) => {
  if (effectMode) {
    const freq = getNormalizedFrequency(distance);
    OscillatorNode.frequency.value = freq;
  } else {
    const pbr = getNormalizedPBR(distance);
    SND.playbackRate = pbr;
  }
}

export const mkSound = (distance, thing, effectMode) => {
  startSound(thing, effectMode);
  adjustSound(distance, effectMode);
}
