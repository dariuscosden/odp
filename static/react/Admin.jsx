import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Login, { Logout } from './Auth';

const axios = require('axios');

// admin global component
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      error: false
    };
  }

  componentDidMount() {
    // localStorage.clear();
    // checks for user
    const userState = JSON.parse(localStorage.getItem('userState'));
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

    console.log(formInput);

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
          localStorage.setItem('userState', JSON.stringify(this.state.user));
        } else {
          this.setState({
            error: { type: 'login', message: 'Incorrect username or password' }
          });
          console.log(this.state.error);
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
    let render;
    if (this.state.user) {
      return <Dashboard onLogout={this.handleLogout} />;
    } else {
      return <Login error={this.state.error} onSubmit={this.handleLogin} />;
    }
  }
}

// admin dashboard component
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Logout onLogout={this.props.onLogout} />;
  }
}

export default Admin;
