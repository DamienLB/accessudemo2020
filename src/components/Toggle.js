import React from 'react';


const Toggle = ({ on, toggleSound }) => {
  
  const text = on ? 'Sound is on' : 'Sound is off';
  return (
    <div>
      <div>{text}</div>
      <label className="toggle">
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
