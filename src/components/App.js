import React from 'react';
import { Provider } from 'react-redux';
import VoiceProvider, { VoiceConsumer } from './VoiceProvider';
import Notification from '../containers/NotificationContainer';
import ToggleVoice from '../containers/ToggleVoiceContainer';
import ToggleSound from '../containers/ToggleSoundContainer';
import DnDArea from '../containers/DnDAreaContainer';
import Thing from '../containers/ThingContainer';
import store from '../store';
import '../stylesheets/main.scss';


// eslint-disable-next-line react/prop-types
const App = () => {
  return (
    <Provider store={store}>
      <VoiceProvider>
        <div className="accessudemo2020">
          <ToggleVoice />
          <ToggleSound />
          <DnDArea>
            <VoiceConsumer>
              {voice =>
                <Thing type="mouse" voice={voice}/>
              }
            </VoiceConsumer>
            <VoiceConsumer>
              {voice =>
                <Thing type="cat" voice={voice}/>
              }
            </VoiceConsumer>
            <VoiceConsumer>
              {voice =>
                <Thing type="cheese" voice={voice}/>
              }
            </VoiceConsumer>
          </DnDArea>
          <Notification />
        </div>
      </VoiceProvider>
    </Provider>

  );
};

export default App;
