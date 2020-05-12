import React from 'react';
import Control from '../containers/Control';
import OpenTrainButton from '../containers/OpenTrainButton';
import SoundMode from '../containers/SoundModeContainer';


const Controls = () => {
  return (
    <div className="controls">
      <Control 
        infoText="Enable sound effects to listen to the item as it is moved. The sound changes as the item is positioned in relation to its neighbors."
        label="Sound Effects"
        fortoggle="sonification_onoff"
        render={SoundMode}
      />
      <Control 
        infoText={`Use your voice to pick-up, move and drop items on the board. You can say something like, "Pick-up the mouse. Move the mouse up. Move the mouse left. Drop the mouse."`}
        label="Voice Input"
        fortoggle="voice_onoff"
      />
      <Control 
        infoText={"Enable gesture recognition to move items on the board. You must first train each command, but clicking the \"Train\" button, and using the dropdown menu to associate your gestures with each command."}
        label="Gesture Input"
        fortoggle="gesture_onoff"
        render={OpenTrainButton}
      />

    </div>
  );
}


export default Controls;
