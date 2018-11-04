import React, { Component } from 'react';
import Login, { Logout } from '../Auth/Auth';

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
      return (
        <>
          <Login error={this.state.error} onSubmit={this.handleLogin} />
        </>
      );
    }
  }
}

// admin dashboard component
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Logout onLogout={this.props.onLogout} />
      </div>
    );
  }
}

export default Admin;
