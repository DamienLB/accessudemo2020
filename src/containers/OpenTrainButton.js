import React from 'react';
import { connect } from 'react-redux';
import { trainModeOn } from '../actions';


const OpenTrainButton = ({ open }) => {
  return (
    <div className="primary">
      <button onClick={ () => open() }>Train</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    open: () => dispatch(trainModeOn()),
  }
}

const OpenTrainButtonContainer = connect(
  null,
  mapDispatchToProps,
)(OpenTrainButton);

export default OpenTrainButtonContainer;
