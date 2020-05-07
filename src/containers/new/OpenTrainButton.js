import React from 'react';
import { connect } from 'react-redux';
import { trainModeOn } from '../actions';


const OpenTrainButton = ({ open }) => {
  return (
    <div>
      <button onClick={ () => open() }></button>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    open: dispatch(trainModeOn()),
  }
}

const OpenTrainButtonContainer = connect(
  null,
  mapDispatchToProps,
)(OpenTrainButton);

export default OpenTrainButtonContainer;
