import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Blog from './Blog';
import Header from './Header';
import Admin from './Admin';

// renders all of react
ReactDOM.render(
  <>
    <Header />
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Blog} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  </>,
  document.getElementById('root')
);
