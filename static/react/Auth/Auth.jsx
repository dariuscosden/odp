import React, { Component } from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <form method="POST" onSubmit={this.props.onSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="password">Password</label>
          <input type="text" name="password" />
          <input type="submit" value="Login" />
          <br />
          {this.props.error.type == 'login' ? (
            <span className="errorMessage">{this.props.error.message}</span>
          ) : null}
        </form>
      </div>
    );
  }
}

export default Login;

export class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href="/logout" onClick={this.props.onLogout}>
        Logout
      </a>
    );
  }
}
