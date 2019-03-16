import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/components/App';
import './scss/main.scss';

const renderMethod =
  process.env.NODE_ENV === 'production' ? ReactDOM.hydrate : ReactDOM.render;
renderMethod(<App />, document.getElementById('root'));
