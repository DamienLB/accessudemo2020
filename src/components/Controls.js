import React from 'react';
import Control from '../containers/Control';
import OpenTrainButton from '../containers/OpenTrainButton';
import SoundMode from '../containers/SoundModeContainer';


const Controls = () => {
  return (
    <div className="controls">
      <Control 
        infoText="info for sound effects"
        label="Sound Effects"
        fortoggle="sonification_onoff"
        render={SoundMode}
      />
      <Control 
        infoText="info for voice input"
        label="Voice Input"
        fortoggle="voice_onoff"
      />
      <Control 
        infoText="info for gesture input"
        label="Gesture Input"
        fortoggle="gesture_onoff"
        render={OpenTrainButton}
      />

    </div>
  );
}


export default Controls;
