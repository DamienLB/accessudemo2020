import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const Toggle = ({ for, on, onchange, disabled }) => {
  
  const wrapperclass = classnames('toggle', {disabled});

  return (
    <div className={wrapperclass}>
      <label className="switch">
        <input
          type="checkbox"
          checked={on}
          onChange={() => onchange(on) }
          disabled={disabled}
          aria-labelledby={for}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

Toggle.propTypes = {
  for:  PropTypes.string.isRequired,
  on: PropTypes.bool.isRequired,
  onchange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,

};

Toggle.defaultProps = {
  disabled: false,
};

export default Toggle;
