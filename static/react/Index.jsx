import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  IndexRoute
} from 'react-router-dom';
import App from './App';
import Admin from './Admin/Admin';

// renders all of react
ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
