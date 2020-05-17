import React from 'react';
import { connect } from 'react-redux';
import Toggle from './ToggleContainer';
import { natEffectOn, synthEffectOn } from '../actions';

const SoundMode = ({ natEffect, synthEffect, natEffectOn, synthEffectOn }) => {
  return (
    <div className="primary">
      <fieldset>
        <label>
          <input
          type="radio"
          name="sound_mode"
          value="natural"
          onChange={natEffectOn}
          checked={natEffect}
          />
          <i
            className="fa fa-paw" aria-label="natural effect on" />
        </label>

        <label>
          <input
          type="radio"
          name="sound_mode"
          value="synthetic"
          onChange={synthEffectOn}
          checked={synthEffect}
          />
          <i
          className="fa fa-bell" aria-label="synthetic effect on"/>
        </label>

      </fieldset>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    natEffect: !state.effectModeOn,
    synthEffect: state.effectModeOn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    natEffectOn: () => dispatch(natEffectOn()),
    synthEffectOn: () => dispatch(synthEffectOn()),
  }
}

const SoundModeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SoundMode);

export default SoundModeContainer;
