import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Toggle from './ToggleContainer';
import { infoBoxOn } from '../actions';


class Control extends Component {
  constructor(props) {
    super(props);
    this.iref = React.createRef();
  }

  render() {
    const defaultfnc = () => null;
    const Render = this.props.render || defaultfnc;
    const controlClass = classnames("control", { disabled: this.props.disabled });
    const focusOnClose = () => { this.iref.current.focus(); };

    return (
      <div className={controlClass}>
        <div className="primary">
          <button
            ref={this.iref}
            className="fa fa-info-circle"
            aria-label="open information text"
            onClick={() => this.props.openInfo(focusOnClose) }
          ></button>
          <div id={this.props.fortoggle} className="toggleText">{this.props.label}</div>
          <Toggle fortoggle={this.props.fortoggle} disabled={this.props.disabled} />
        </div>
        <Render />
      </div>
    ); 
  }
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
    openInfo: (closefnc) => dispatch(infoBoxOn(ownprops.infoText, closefnc)),
  }
}

const ControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Control);

export default ControlContainer;
