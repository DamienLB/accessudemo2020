import React from 'react';
import Control from '../containers/Control';
import OpenTrainButton from '../containers/OpenTrainButton';
import SoundMode from './SoundMode';


const Controls = () => {
  return (
    <div className="controls">
      <Control 
        infoText="info for sound effects"
        label="Sound Effects"
        for="sonification_onoff"
        render={SoundMode}
      />
      <Control 
        infoText="info for voice input"
        label="Voice Input"
        for="voice_onoff"
      />
      <Control 
        infoText="info for voice input"
        label="Gesture Input"
        for="gesture_onoff"
        render={OpenTrainButton}
      />

    </div>
  );
}


export default Controls;
