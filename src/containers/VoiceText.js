import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { VoiceConsumer } from '../components/VoiceProvider'; 


const VoiceText = ({on}) => {
  return (
    <VoiceConsumer>
      {voice => {
        const text = on && voice.transcript || "";
        const classes = classnames("fa", "fa-microphone", { blink: !text })
        
        return(
          <div
            className="voiceText"
            style={{
              display: (on && 'flex' || 'none'),
            }}>
            <button className={classes} aria-hidden="true"></button>
            <div>{text}</div>
          </div>
        )}
      }
    </VoiceConsumer>)
  ;
};

const mapStateToProps = (state, ownprops) => {
  return {
    on: state.voiceOn,
  };
};


const VoiceTextContainer = connect(
  mapStateToProps,
  null,
)(VoiceText);


export default VoiceTextContainer;
       