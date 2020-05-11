import React from 'react';
import Toggle from '../containers/ToggleContainer';


const SoundMode = () => {
  return (
    <div className="primary">
      <button className="fa fa-leaf" aria-label="file"></button>
      <Toggle fortoggle="effectmode"/>
      <button className="fa fa-signal" aria-label="automated"></button>
    </div>
  );
}

export default SoundMode;
