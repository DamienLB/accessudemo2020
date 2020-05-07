import React from 'react';
import { connect } from 'react-redux';
import { infoBoxOff } from '../actions';


const InfoBox = ({ text, close, on }) => {
  return (
    <div className="infoBar" style={{
      display: on && 'block' || 'none';
    }}>
      <div>{text}</div>
      <i
        aria-label="close"
        onClick={() => close()}
      >&#x274C;</i>
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
    close: dispatch(infoBoxOff()),
  }
}

const InfoBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoBox);

export default InfoBoxContainer;
