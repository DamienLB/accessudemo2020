import React, { Component} from 'react';
import { connect } from 'react-redux';
import classnames from "classnames";
import map from 'lodash.map';
import VideoContainer from './VideoContainer';
import { trainGesture, trainModeOff, DESIRED_COUNT_EACH, DESIRED_COUNT_COMPLETE } from '../actions';


class TrainPanel extends Component{
  capture() {
    this.props.capture(this.select.value);
  }

  componentDidUpdate(prevProps) {
    if (this.props.on && !prevProps.on) {
      this.closebtn.focus();
    }
  }

  render() {
    const items = map(this.props.gestureObj, (count, item) => {
      const itemcompleted = (count >= DESIRED_COUNT_EACH ? "&#10003;" : "&#10005;");
      return (<option value={item} key={item} dangerouslySetInnerHTML={{__html: `${item} ${itemcompleted}` }} />)
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
    const completeCheck = percentComplete >= 100 ? "&#10003;" : '';
    return (
      <div
        className={classes}
      >
        <div className="trainHeader">
          <h3>Train</h3>
          <button
            aria-label="close"
            onClick={() => this.props.close()}
            className="fa fa-lg fa-times-circle-o"
            ref={(el) => this.closebtn = el}
          ></button>
        </div>
        <div id="panelTrainVideo" className="trainVideo">
          <VideoContainer name="panel"/>
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
            <div><label htmlFor="progress" dangerouslySetInnerHTML={{__html: `Progress ${completeCheck}` }} /></div>
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
    capture: (gesture) => dispatch(trainGesture(gesture)),
    close: () => dispatch(trainModeOff()),
  }
}

const TrainPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainPanel);

export default TrainPanelContainer;
