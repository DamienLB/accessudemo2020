import React, { Component } from 'react';
import Train from '../containers/TrainContainer';
import Loader from '../containers/LoaderContainer';
import '../stylesheets/main.scss';

export const Main = () => {
    return (
    <div className="savi-voiceloader">
      <Train />
      <Loader />
    </div>
  );
};
