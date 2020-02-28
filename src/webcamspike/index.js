import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import './version';

const element = document.getElementById('savi-tensorflow-demo1'); // eslint-disable-line no-undef
const modalMode = element.dataset.modalmode === 'false' ? false : !!element.dataset.modalmode;
ReactDOM.render(
  <App modalMode={modalMode} />,
  element,
);
