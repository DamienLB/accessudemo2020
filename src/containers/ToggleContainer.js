import { connect } from 'react-redux';
import Toggle from '../components/Toggle';
import { toggle } from '../actions';


const mapStateToProps = (state, ownprops) => {
  let on;
  switch(ownprops.fortoggle) {
    case "sonification_onoff":
        on = state.soundOn;
      break
    case "effectmode":
        on = state.effectModeOn;
      break
    case "voice_onoff":
        on = state.voiceOn;
      break
    case "gesture_onoff":
        on = state.gestureOn;
      break;
  }
  return {
    on,
    fortoggle: ownprops.fortoggle,
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    onchange: (current) => dispatch(toggle(ownprops.fortoggle, current)),
  }
}

const ToggleEffectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toggle);

export default ToggleEffectContainer;
