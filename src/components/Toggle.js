import React from 'react';


const Toggle = ({ on, onchange, onoff }) => {
  
  const text = on ? onoff[0] : onoff[1];
  return (
    <div className="toggle">
      <div className="toggleText">{text}</div>
      <label className="switch">
        <input
          type="checkbox"
          checked={on}
          onChange={() => onchange() }
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Toggle;
