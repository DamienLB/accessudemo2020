import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Toggle from './ToggleContainer';
import { infoBoxOn } from '../actions';


const Control = ({openInfo, label, fortoggle, render, disabled}) => {
  const defaultfnc = () => null;
  const extra = render || defaultfnc;
  const controlClass = classnames("control", { disabled });
  return (
    <div className={controlClass}>
      <div>
        <i
          aria-label="open information text"
          onClick={() => openInfo() }
        >&#8505</i>
        <div id={fortoggle} className="toggleText">{label}</div>
        <Toggle fortoggle={fortoggle} disabled={disabled}/>
      </div>
      {extra()}
    </div>
  );
}

const mapStateToProps = (state, ownprops) => {
  return {
    label: ownprops.label,
    fortoggle: ownprops.fortoggle,
    render: ownprops.render,
    disabled: ownprops.fortoggle === 'gesture_onoff' && !state.gestureEnabled,
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    openInfo: dispatch(infoBoxOn(ownprops.infoText)),
  }
}

const ControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Control);

export default ControlContainer;
