import React from 'react';
import { connect } from 'react-redux';
import { trainModeOn } from '../actions';


const OpenTrainButton = ({ open, disabled }) => {
  return (
    <div className="primary">
      <button id="opentrainpanelbtn" disabled={disabled} onClick={ () => open() }>Train</button>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    disabled: state.gestureOn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    open: () => dispatch(trainModeOn()),
  }
}

const OpenTrainButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenTrainButton);

export default OpenTrainButtonContainer;
