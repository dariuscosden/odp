import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
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
