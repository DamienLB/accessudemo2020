import React from 'react';
import Toggle from '../containers/ToggleContainer';


const SoundMode = () => {
  return (
    <div className="primary">
      <i className="fa fa-leaf" aria-label="file"></i>
      <Toggle fortoggle="effectmode"/>
      <i className="fa fa-signal" aria-label="automated"></i>
    </div>
  );
}

export default SoundMode;
