import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
          <input onClick={this.props.onClick} type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
