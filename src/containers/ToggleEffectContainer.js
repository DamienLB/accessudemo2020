import { connect } from 'react-redux';
import Toggle from '../components/Toggle';
import { toggleEffectMode } from '../actions';


const mapStateToProps = (state) => {
  return {
    on: state.effectModeOn,
    onoff: ['Effect mode is On', 'Effect mode is Off'],
    id: "effectonoff",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onchange: () => dispatch(toggleEffectMode()),
  }
}

const ToggleEffectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toggle);

export default ToggleEffectContainer;
