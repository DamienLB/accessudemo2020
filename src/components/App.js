import React from 'react';
import { Provider } from 'react-redux';
import { VoiceConsumer } from './VoiceProvider';
import  Controls from '../containers/ControlsContainer';
import VoiceProvider from '../containers/VoiceContainer';
import Notification from '../containers/NotificationContainer';
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
          <Controls />
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
