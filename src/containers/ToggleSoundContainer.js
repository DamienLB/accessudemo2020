import { connect } from 'react-redux';
import Toggle from '../components/Toggle';
import { toggleSound } from '../actions';


const mapStateToProps = (state) => {
  return {
    on: state.soundOn,
    onoff: ['Sound is On', 'Sound is Off'],
    id: "soundonoff",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onchange: () => dispatch(toggleSound()),
  }
}

const ToggleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toggle);

export default ToggleContainer;
