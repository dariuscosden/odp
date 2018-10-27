import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Logout extends React.Component {
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

export default Logout;
