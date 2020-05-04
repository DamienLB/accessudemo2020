import { connect } from 'react-redux';
import VoiceProvider from '../components/VoiceProvider';


const mapStateToProps = (state, ownprops) => {
  return {
    voiceOn: state.voiceOn,
  };
};


const VoiceContainer = connect(
  mapStateToProps,
  null,
)(VoiceProvider);


export default VoiceContainer;

