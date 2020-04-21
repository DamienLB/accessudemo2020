import { connect } from 'react-redux';
import Toggle from '../components/Toggle';
import { toggleTrainGesture } from '../actions';


const mapStateToProps = (state) => {
  return {
    on: state.trainGestureOn,
    onoff: ['Training Gestures is On', 'Training Gestures are Off'],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onchange: () => dispatch(toggleTrainGesture()),
  }
}

const ToggleTrainGestureContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toggle);

export default ToggleTrainGestureContainer;
