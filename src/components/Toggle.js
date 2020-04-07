import React from 'react';


const Toggle = ({ on, toggleSound }) => {
  
  const text = on ? 'Sound is On' : 'Sound is Off';
  return (
    <div className="soundToggle">
      <div className="soundToggleText">{text}</div>
      <label className="switch">
        <input
          type="checkbox"
          checked={on}
          onChange={() => toggleSound() }
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Toggle;
