import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Login from './Login';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: false,
      password: false
    };
  }

  componentDidMount() {
    // checks for loggedInState
    const loggedInState = localStorage.getItem('loggedInState');
    if (loggedInState) {
      try {
        this.setState(JSON.parse(loggedInState));
      } catch (e) {
        console.log(e);
      }
    }
  }

  // handles the login
  handleLogin = e => {
    e.preventDefault();

    // sends data to python
    var path = window.location.href;
    axios
      .post(path, {
        username: 'Fred',
        password: 'Flintstone'
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ isLoggedIn: true });
    localStorage.setItem('loggedInState', JSON.stringify(this.state));
  };

  // handles the logout
  handleLogout = e => {
    e.preventDefault();
    this.setState({ isLoggedIn: false });
    localStorage.setItem('loggedInState', JSON.stringify(this.state));
  };

  render() {
    // checks for admin dashboard
    const path = window.location.href;
    let components;
    if (path.indexOf('admin') > -1) {
      components = (
        <React.Fragment>
          <Header
            isLoggedIn={this.state.isLoggedIn}
            onLogout={this.handleLogout}
          />
          <Login onSubmit={this.handleLogin} />
        </React.Fragment>
      );
    } else {
      components = (
        <React.Fragment>
          <Header isLoggedIn={this.state.isLoggedIn} />
        </React.Fragment>
      );
    }

    return components;
  }
}

export default App;
