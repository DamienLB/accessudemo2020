import React from 'react';
import InfoBox from '../containers/InfoBox';
import Controls from './Controls';
import '../stylesheets/newmain.scss';


const App = () => {
  return (
    <div className="accessudemo2020">
      <div className="controls">
        <div className="test"/>
        <div className="test"/>
        <div className="test"/>
      </div>
      <InfoBox />
      <div className="voiceText test" />
      <div className="dnd test">
        <div className="trainPanel">
          <div className="trainHeader test" />
          <div className="trainVideo test" />
          <div className="trainControls test" />
        </div>
      </div>
      <div className="notification" />
    </div>);
}

export default App;
