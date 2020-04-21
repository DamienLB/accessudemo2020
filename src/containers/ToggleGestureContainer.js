import { connect } from 'react-redux';
import Toggle from '../components/Toggle';
import { toggleGesture } from '../actions';


const mapStateToProps = (state) => {
  return {
    on: state.gestureOn,
    onoff: ['Gestures are On', 'Gestures are Off', 'Gestures are Disabled'],
    disabled: !state.gestureEnabled
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onchange: () => dispatch(toggleGesture()),
  }
}

const ToggleGestureContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toggle);

export default ToggleGestureContainer;
