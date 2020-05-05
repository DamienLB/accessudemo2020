import { connect } from 'react-redux';
import Toggle from '../components/Toggle';
import { toggleVoice } from '../actions';


const mapStateToProps = (state) => {
  return {
    on: state.voiceOn,
    onoff: ['Voice Command is On', 'Voice Command is Off'],
    id: "voiceonoff",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onchange: () => dispatch(toggleVoice()),
  }
}

const ToggleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toggle);

export default ToggleContainer;
