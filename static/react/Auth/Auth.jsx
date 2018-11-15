import React, { Component } from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="loginForm-flex">
          <h1>Ouate de phoque</h1>
          <span>Admin</span>
          <form
            className="loginForm"
            method="POST"
            onSubmit={this.props.onSubmit}
          >
            <label htmlFor="username">Username</label>
            <input type="text" name="username" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <input type="submit" value="Login" />
            <br />
          </form>
          {this.props.error.type == 'login' ? (
            <span className="errorMessage">{this.props.error.message}</span>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Login;

class InitializeApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="loginForm-flex">
          <h1>Ouate de phoque</h1>
          <span>Initialize a backend account</span>
          <form
            className="loginForm"
            method="POST"
            onSubmit={this.props.onSubmit}
          >
            <label htmlFor="username">Username</label>
            <input type="text" name="username" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <input type="submit" value="Initialize" />
            <br />
          </form>
          {this.props.error.type == 'login' ? (
            <span className="errorMessage">{this.props.error.message}</span>
          ) : null}
        </div>
      </div>
    );
  }
}

export { InitializeApp };

export class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        href="/logout"
        className="adminDashboard-sidebarLink"
        onClick={this.props.onLogout}
      >
        Logout
      </a>
    );
  }
}
