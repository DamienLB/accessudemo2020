import React from 'react';
import ToggleVoice from '../containers/ToggleVoiceContainer';
import ToggleSound from '../containers/ToggleSoundContainer';
import ToggleGestures from '../containers/ToggleGestureContainer';
import ToggleTrainGestures from '../containers/ToggleTrainGestureContainer';

const Controls = () => {
  return (
    <div className="controls">
      <div>
        <ToggleGestures />
        <ToggleTrainGestures />
      </div>
      <div>
        <ToggleVoice />
        <ToggleSound />
      </div>
    </div>

  );
}

export default Controls;
