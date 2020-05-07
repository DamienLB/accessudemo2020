import React from 'react';
import { connect } from 'react-redux';
import { infoBoxOff } from '../actions';


const InfoBox = ({ text, close, on }) => {
  return (
    <div className="infoBar" style={{
      display: (on && 'flex' || 'none'),
    }}>
      <div>{text}</div>
      <i
        aria-label="close"
        onClick={() => close()}
        className="fa fa-lg fa-times-circle-o"
      ></i>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    text: state.infoText,
    on: state.infoOn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(infoBoxOff()),
  }
}

const InfoBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoBox);

export default InfoBoxContainer;
