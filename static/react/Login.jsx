import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Login extends React.Component {
  render() {
    return (
      <div className="container">
        <form method="POST">
          <label for="username">Username</label>
          <input type="text" name="username" />
          <label for="password">Password</label>
          <input type="text" name="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
