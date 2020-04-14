import { connect } from 'react-redux';
import Toggle from '../components/Toggle';
import { toggleSound } from '../actions';


const mapStateToProps = (state) => {
  return {
    on: state.soundOn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSound: () => dispatch(toggleSound()),
  }
}

const ToggleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toggle);

export default ToggleContainer;
