import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Login from './Login';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false
    };
  }

  componentDidMount() {
    // checks for loggedInState
    // const loggedInState = localStorage.getItem('loggedInState');
    // if (loggedInState) {
    //   try {
    //     this.setState(JSON.parse(loggedInState));
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  }

  // handles the login
  handleLogin = e => {
    e.preventDefault();
    const formInput = {};

    e.target.childNodes.forEach(function(event) {
      if (event.tagName === 'INPUT' && event.type != 'submit')
        formInput[event.name] = event.value;
      event.value = null;
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
        if (response.data.authenticated)
          this.setState({
            user: { authenticated: true, username: response.data.username }
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // handles the logout
  handleLogout = e => {
    e.preventDefault();
    this.setState({ user: false });
    localStorage.setItem('loggedInState', JSON.stringify(this.state));
  };

  render() {
    // checks for admin dashboard
    const path = window.location.href;
    let components;
    if (path.indexOf('admin') > -1) {
      components = (
        <React.Fragment>
          <Header user={this.state.user} onLogout={this.handleLogout} />
          <Login onSubmit={this.handleLogin} />
        </React.Fragment>
      );
    } else {
      components = (
        <React.Fragment>
          <Header user={this.state.user} />
        </React.Fragment>
      );
    }

    return components;
  }
}

export default App;
