import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { videoReady } from '../actions';


class Video extends Component {
  componentDidMount() {
    this.props.ready(this.video, this.props.name);
  }

  render() {
    const style = { display: this.props.display ? 'block' : 'none' };
    return (
      <div>
        <video ref={(el) => this.video = el} style={style} autoPlay playsInline muted width="100%" height="100%" />
        <div>{this.props.text}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownprops) => {
  const { trainGestureOn, gestureOn, commandFor, command } = state;
  const showPanel = !gestureOn || trainGestureOn;
  return {
    display: (ownprops.name === 'panel' && showPanel) || (ownprops.name === 'app' && !showPanel),
    name: ownprops.name,
    text: ownprops.name === 'app' ? `${commandFor}: ${command}` : "",
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
   ready: (videoEl, name) => dispatch(videoReady(videoEl, name)),
  }
}

const VideoContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Video);

export default VideoContainer;
