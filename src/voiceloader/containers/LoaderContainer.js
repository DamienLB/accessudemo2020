import { connect } from 'react-redux';
import Loader from '../components/Loader';
import { widthChange } from '../actions';

const mapStateToProps = (state) => {
  return {
    app: state.app,
    title: state.components[state.current] || '',
  };
};

const LoaderContainer = connect(
  mapStateToProps,
  null,
)(Loader);

export default LoaderContainer;
