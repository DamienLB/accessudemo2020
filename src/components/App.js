import React from 'react';
import { Provider } from 'react-redux';
import { VoiceConsumer } from './VoiceProvider';
import InfoBox from '../containers/InfoBox';
import Controls from './Controls';
import VoiceText from '../containers/VoiceText';
import VoiceProvider from '../containers/VoiceContainer';
import Notification from '../containers/NotificationContainer';
import DnDArea from '../containers/DnDAreaContainer';
import Thing from '../containers/ThingContainer';
import TrainPanel from '../containers/TrainPanel';
import VideoContainer from '../containers/VideoContainer';
import store from '../store';
import '../stylesheets/main.scss';


const App = () => {
  return (
    <Provider store={store}>
      <VoiceProvider>
        <div className="accessudemo2020">
          <Controls />
          <InfoBox />
          <VoiceText />
          <div className="dnd">
            <div id="appTrainVideo">
              <VideoContainer name="app"/>
            </div>
            <DnDArea>
              <VoiceConsumer>
                {voice =>
                  <Thing type="cat" voice={voice}/>
                }
              </VoiceConsumer>
              <VoiceConsumer>
                {voice =>
                  <Thing type="mouse" voice={voice}/>
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
