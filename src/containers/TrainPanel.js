import React, { Component} from 'react';
import { connect } from 'react-redux';
import { videoReady, trainGesture, trainModeOff, DESIRED_COUNT_EACH, DESIRED_COUNT_COMPLETE } from '../actions';


class TrainPanel extends Component{
  componentDidMount() {
    this.props.ready(this.video);
  }

  capture() {
    this.props.capture(this.select.value);
  }

  render() {
    const items = map(this.props.gestureObj, (count, item) => {
      return (<option value={item} key={item}>{`${item}`}</option>)
    });

    const completed = Object
      .values(this.props.gestureObj)
      .reduce((result, complete) => {
        if (complete > DESIRED_COUNT_EACH) {
          return result + DESIRED_COUNT_EACH;
        }
        return result + complete;
      }, 0);
    
    const percentComplete = Math.round(completed / DESIRED_COUNT_COMPLETE);
    return (


      <div
        className="trainPanel"
        style={{
          display: this.props.on ? 'block' : 'none',
        }}
      >
        <div className="trainHeader">
          <h3>Train</h3>
          <i
            aria-label="close"
            onClick={() => this.props.close()}
          >&#x274C;</i>
        </div>
        <div className="trainVideo">
          <video
            ref={el => this.video = el}
            autoPlay
            playsInline
            muted
            id="webcam"
            width="100%"
            height="100%"
           />
        </div>
        <div className="trainControls">
          <div>
            <label htmlFor="action">Action</label>
            <select
              ref={el => this.select = el}
              id="action"
            >{items}</select>
          </div>
          <div>
            <button
              aria-label="capture"
              onClick={() => this.capture()}>Capture</button>
          </div>
          <div>
            <label tmlFor="progress">Progress</label>
            <progress id="progress" value={percentComplete} max="100">{percentComplete}%</progress>
          </div>
        </div>
      </div>
    );
  }
} 

const mapStateToProps = (state) => {
  return {
    gestureObj: state.trainingGestureCounts,
    on: state.trainGestureEnabled,
  };
};            


const mapDispatchToProps = (dispatch) => {
  return {
    ready: (videoEl) => dispatch(videoReady(videoEl)),
    capture: (gesture) => dispatch(trainGesture(gesture)),
    close: () => dispatch(trainModeOff()),
  }
}

const TrainPanelContainer = connect(
  null,
  mapDispatchToProps,
)(TrainPanel);

export default TrainPanelContainer;
