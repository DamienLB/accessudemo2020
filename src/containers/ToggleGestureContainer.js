import { connect } from 'react-redux';
import Toggle from '../components/Toggle';
import { gestureOn, gestureOff } from '../actions';


const mapStateToProps = (state) => {
  return {
    on: state.gestureOn,
    onoff: ['Gestures are On', 'Gestures are Off'],
    disabled: !state.gestureEnabled
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onchange: (on) => on ? dispatch(gestureOff()) : dispatch(gestureOn()),
  }
}

const ToggleGestureContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toggle);

export default ToggleGestureContainer;
