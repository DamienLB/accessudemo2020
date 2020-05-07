import React from 'react';
import { connect } from 'react-redux';
import { trainModeOn } from '../actions';


const OpenTrainButton = (props) => {
  return (
    <div>
      <button onClick={ () => props.open() }>Train</button>
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

export default OpenTrainButton;
