import React, { Component} from 'react';
import { connect } from 'react-redux';
import classnames from "classnames";
import map from 'lodash.map';
import { videoReady, trainGesture, trainModeOff, DESIRED_COUNT_EACH, DESIRED_COUNT_COMPLETE } from '../actions';


class TrainPanel extends Component{
  componentDidMount() {
    this.props.ready(this.video);
  }

  capture() {
    console.log(this.select.value);
    this.props.capture(this.select.value);
  }

  render() {

    const items = map(this.props.gestureObj, (count, item) => {
      return (<option value={item} key={item}>{`${item}`}</option>)
    });

    const completed = Object.values(this.props.gestureObj)
      .reduce((result, complete) => {
        if (complete > DESIRED_COUNT_EACH) {
          return result + DESIRED_COUNT_EACH;
        }
        return result + complete;
      }, 0);

    const percentComplete = Math.round(completed / DESIRED_COUNT_COMPLETE * 100);
    const classes = classnames("trainPanel", { enabled: this.props.on });

    return (
      <div
        className={classes}
      >
        <div className="trainHeader">
          <h3>Train</h3>
          <i
            tabIndex="0"
            aria-label="close"
            onClick={() => this.props.close()}
            className="fa fa-lg fa-times-circle-o"
          ></i>
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
            <label htmlFor="action">Action: </label>
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
            <div><label htmlFor="progress">Progress</label></div>
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
    on: state.trainGestureOn,
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
  mapStateToProps,
  mapDispatchToProps,
)(TrainPanel);

export default TrainPanelContainer;
