import React from 'react';
import { Provider } from 'react-redux';
import { VoiceConsumer } from './VoiceProvider';
import InfoBox from '../containers/InfoBox';
import Controls from './Controls';
import VoiceText from './VoiceText';
import VoiceProvider from '../containers/VoiceContainer';
import Notification from '../containers/NotificationContainer';
import DnDArea from '../containers/DnDAreaContainer';
import Thing from '../containers/ThingContainer';TrainPanel
import TrainPanel from '../containers/TrainPanel';
import store from '../store';
import '../stylesheets/newmain.scss';


const App = () => {
  return (
    <Provider store={store}>
      <VoiceProvider>
        <div className="accessudemo2020">
          <Controls />
          <InfoBox />
          <VoiceText />
          <div className="dnd">
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
            <TrainPanel />
          </div>
          <Notification />
        </div>
      </VoiceProvider>
    </Provider>
  );
}

export default App;
