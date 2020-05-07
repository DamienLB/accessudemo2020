
import { VoiceConsumer } from './VoiceProvider';
         
const VoiceText = ({text}) => {
  return (<div>{text}</div>);
};


          <VoiceConsumer>
            {voice =>
              <VoiceText text={voice.transcript}/>
            }
          </VoiceConsumer>