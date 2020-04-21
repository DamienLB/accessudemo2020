import { connect } from 'react-redux';
import Controls from '../components/Controls';
import { videoReady } from '../actions';


const mapDispatchToProps = (dispatch) => {
  return {
    ready: (videoEl) => dispatch(videoReady(videoEl)),
  }
}

const ControlsContainer = connect(
  null,
  mapDispatchToProps,
)(Controls);

export default ControlsContainer;
