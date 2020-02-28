import React from 'react';
import { Provider } from 'react-redux';
import './webcomponents/dnd';
import Notification from '../containers/NotificationContainer';
import Mouse from './Mouse';
import Cat from './Cat';
import Cheese from './Cheese';
import store from '../store';
import '../stylesheets/main.scss';


// eslint-disable-next-line react/prop-types
const App = () => {
  return (
    <Provider store={store}>
      <div className="accessudemo2020">
        <dnd-area>
          <Mouse />
          <Cat />
          <Cheese />
        </dnd-area>
        <Notification />
      </div> 
    </Provider>

  );
};

export default App;
