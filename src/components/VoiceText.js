import React from 'react';
import { VoiceConsumer } from './VoiceProvider';
        

const VoiceText = ({text}) => {
  return (
    <VoiceConsumer>
      {voice =>
        <div className="voiceText">{voice.transcript}</div>
      }
    </VoiceConsumer>)
  ;
};


export default VoiceText;
       