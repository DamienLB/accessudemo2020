import React from 'react';
import Control from '../containers/Control';
import OpenTrainButton from '../containers/OpenTrainButton';
import SoundMode from '../containers/SoundModeContainer';


const Controls = () => {
  return (
    <div className="controls">
      <Control 
        infoText="Move the objects to hear the different sound effects."
        label="Sound Effects"
        fortoggle="sonification_onoff"
        render={SoundMode}
      />
      <Control 
        infoText={`Say commands to move the objects, such as, "<b>Pick up</b> the mouse," "Move it <b>left</b>," and "<b>Drop</b> it."`}
        label="Voice Input"
        fortoggle="voice_onoff"
      />
      <Control 
        infoText={"Train the model by capturing at least six of the same gestures for each action. Then use your gestures to move the objects."}
        label="Gesture Input"
        fortoggle="gesture_onoff"
        render={OpenTrainButton}
      />

    </div>
  );
}


export default Controls;
