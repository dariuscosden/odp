import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './Header';

// renders all of react
ReactDOM.render(
  <>
    <Header />
    <App />
  </>,
  document.getElementById('root')
);
