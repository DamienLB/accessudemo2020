import React, { Component } from 'react';
import { connect } from 'react-redux';
import { infoBoxOff } from '../actions';


class InfoBox extends Component {

  componentDidUpdate(prevProps) {
    if ((this.props.on && !prevProps.on) || (this.props.text && !prevProps.text)) {
      this.closebtn.focus();
    }
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
          onClick={() => this.props.close()}
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
