import { connect } from 'react-redux';
import Toggle from '../components/Toggle';
import { trainGestureOn, trainGestureOff } from '../actions';


const mapStateToProps = (state) => {
  return {
    on: state.trainGestureOn,
    onoff: ['Training Gestures is On', 'Training Gestures are Off'],
    disabled: !state.trainGestureEnabled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onchange: (on) => on ? dispatch(trainGestureOff()) : dispatch(trainGestureOn()),
  }
}

const ToggleTrainGestureContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toggle);

export default ToggleTrainGestureContainer;
