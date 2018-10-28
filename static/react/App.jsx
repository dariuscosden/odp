import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Login from './Login';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      error: false
    };
  }

  componentDidMount() {
    // checks for user
    const userState = localStorage.getItem('userState');
    if (userState) {
      try {
        this.setState({ user: userState });
      } catch (e) {
        // console.log(e);
      }
    }
  }

  // handles the login
  handleLogin = e => {
    e.preventDefault();
    const formInput = {};
    e.target.childNodes.forEach(function(event) {
      if (event.tagName === 'INPUT' && event.type != 'submit') {
        formInput[event.name] = event.value;
        event.value = null;
      }
    });

    // sends data to python
    var path = window.location.href;
    axios({
      method: 'post',
      url: path,
      data: { formInput }
    })
      .then(response => {
        if (response.data.authenticated) {
          this.setState({
            user: { authenticated: true, username: response.data.username },
            error: false
          });
          localStorage.setItem('userState', this.state.user);
        } else {
          this.setState({
            error: { type: 'login', message: 'Incorrect username or password' }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // handles the logout
  handleLogout = e => {
    e.preventDefault();
    this.setState({ user: false });
    localStorage.clear();
  };

  render() {
    // checks for admin dashboard
    const path = window.location.href;
    let components;
    if (path.indexOf('admin') > -1) {
      components = (
        <>
          <Header user={this.state.user} onLogout={this.handleLogout} />
          {this.state.user ? null : (
            <Login onSubmit={this.handleLogin} error={this.state.error} />
          )}
        </>
      );
    } else {
      components = (
        <>
          <Header user={this.state.user} />
        </>
      );
    }

    return components;
  }
}

export default App;
