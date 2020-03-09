import React from 'react';
import { Provider } from 'react-redux';
import './webcomponents/dnd';
import Notification from '../containers/NotificationContainer';
import Thing from '../containers/ThingContainer';
import store from '../store';
import '../stylesheets/main.scss';


// eslint-disable-next-line react/prop-types
const App = () => {
  return (
    <Provider store={store}>
      <div className="accessudemo2020">
        <dnd-area>
          <Thing type="mouse"/>
          <Thing type="cat"/>
          <Thing type="cheese"/>
        </dnd-area>
        <Notification />
      </div> 
    </Provider>

  );
};

export default App;
