import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Login from './Login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    // checks for admin dashboard
    const path = window.location.href;
    let components;
    if (path.indexOf('admin') > -1) {
      components = (
        <React.Fragment>
          <Header
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            userURL={this.state.userURL}
          />
          <Login />
        </React.Fragment>
      );
    } else {
      components = (
        <React.Fragment>
          <Header
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            userURL={this.state.userURL}
          />
        </React.Fragment>
      );
    }

    return components;
  }
}
