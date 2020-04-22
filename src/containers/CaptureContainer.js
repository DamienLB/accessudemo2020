import { connect } from 'react-redux';
import SelectGesture from '../components/SelectGesture';
import { trainGesture } from '../actions';


const mapStateToProps = (state) => {
  return {
    gestureObj: state.trainingGestureCounts,
    enabled: state.trainGestureOn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    capture: (gesture) => dispatch(trainGesture(gesture)),
  }
}

const CaptureContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectGesture);

export default CaptureContainer;
