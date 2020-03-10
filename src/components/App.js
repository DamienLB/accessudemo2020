import React from 'react';
import { Provider } from 'react-redux';
import Notification from '../containers/NotificationContainer';
import DnDArea from '../containers/DnDAreaContainer';
import Thing from '../containers/ThingContainer';
import store from '../store';
import '../stylesheets/main.scss';


// eslint-disable-next-line react/prop-types
const App = () => {
  return (
    <Provider store={store}>
      <div className="accessudemo2020">
        <DnDArea>
          <Thing type="mouse"/>
          <Thing type="cat"/>
          <Thing type="cheese"/>
        </DnDArea>
        <Notification />
      </div> 
    </Provider>

  );
};

export default App;
