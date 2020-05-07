import { connect } from 'react-redux';
import classnames from 'classnames';
import Toggle from './ToggleContainer';
import { infoBoxOn } from '../actions';


const Control = ({openInfo, label, for, render, disabled}) => {
  const extra = render || () => null;
  const controlClass = classnames("control", { disabled });
  return (
    <div className={controlClass}>
      <div>
        <i
          aria-label="open information text"
          onClick={() => openInfo() }
        >&#8505</i>
        <div id={for} className="toggleText">{label}</div>
        <Toggle for={for} disabled={disabled}/>
      </div>
      {extra()}
    </div>
  );
}

const mapStateToProps = (state, ownprops) => {
  return {
    label: ownprops.label,
    for: ownprops.for,
    render: ownprops.render,
    disabled: ownprops.for === 'gesture_onoff' && !state.gestureEnabled,
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
