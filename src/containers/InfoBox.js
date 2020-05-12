import React, { Component } from 'react';
import { connect } from 'react-redux';
import { infoBoxOff } from '../actions';


class InfoBox extends Component {

  componentDidUpdate(prevProps) {
    this.closebtn.focus();
  }

  render() {
    return (
      <div className="infoBar" style={{
        display: (this.props.on && 'flex' || 'none'),
      }}>
        <div>{this.props.text}</div>
        <button
          ref={(el) => this.closebtn = el}
          aria-label="close"
          onClick={() => {
            this.props.close();
            this.props.closefnc();
          }}
          className="fa fa fa-times-circle-o"
        ></button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.infoText,
    on: state.infoOn,
    closefnc: state.infoCloseFnc,
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
