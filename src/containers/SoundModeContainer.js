import React from 'react';
import { connect } from 'react-redux';
import Toggle from './ToggleContainer';
import { natEffectOn, synthEffectOn } from '../actions';

const SoundMode = ({ natEffectOn, synthEffectOn }) => {
  return (
    <div className="primary">
      <i
        className="fa fa-paw" aria-label="natural effect on" />
      <Toggle fortoggle="effectmode"/>
      <i
        className="fa fa-bell" aria-label="synthetic effect on" />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    natEffectOn: () => dispatch(natEffectOn()),
    synthEffectOn: () => dispatch(synthEffectOn()),
  }
}

const SoundModeContainer = connect(
  null,
  mapDispatchToProps,
)(SoundMode);

export default SoundModeContainer;
