import React, { Component } from 'react';
import ToggleVoice from '../containers/ToggleVoiceContainer';
import ToggleSound from '../containers/ToggleSoundContainer';
import ToggleGestures from '../containers/ToggleGestureContainer';
import CaptureSelect from '../containers/CaptureContainer';
import ToggleTrainGestures from '../containers/ToggleTrainGestureContainer';
import { VoiceConsumer } from './VoiceProvider';


const VoiceText = ({text}) => {
  return (<div>{text}</div>);
};

class Controls extends Component{
  componentDidMount() {
    this.props.ready(this.video);
  }

  render() {
    return (
      <div className="controls">
        <div>
          <div className="video">
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
        </div>
        <div>
          <ToggleTrainGestures />
          <CaptureSelect />
          <ToggleGestures />
        </div>
        <div>
          <ToggleVoice />
          <VoiceConsumer>
            {voice =>
              <VoiceText text={voice.transcript}/>
            }
          </VoiceConsumer>
          <ToggleSound />
        </div>
      </div>
    );
  }
}

export default Controls;
