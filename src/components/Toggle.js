import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const Toggle = ({ on, onchange, onoff, disabled }) => {
  
  const text = (on ? onoff[0] : onoff[1] );
  const wrapperclass = classnames('toggle', {disabled});

  return (
    <div className={wrapperclass}>
      <div className="toggleText">{text}</div>
      <label className="switch">
        <input
          type="checkbox"
          checked={on}
          onChange={() => onchange(on) }
          disabled={disabled}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};


Toggle.propTypes = {
  on: PropTypes.bool.isRequired,
  onoff: PropTypes.array.isRequired,
  onchange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,

};

Toggle.defaultProps = {
  disabled: false,
};

export default Toggle;
