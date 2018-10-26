import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: false,
      userURL: false
    };
  }
  render() {
    return (
      <Header
        isLoggedIn={this.state.isLoggedIn}
        user={this.state.user}
        userURL={this.state.userURL}
      />
    );
  }
}
