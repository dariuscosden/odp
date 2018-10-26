import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <div className="headerContainer">
        <div className="container">
          <div className="headerContainer-flex">
            <div className="headerContainer-logo">
              <h1>Ouate de phoque</h1>
            </div>
            <div className="headerContainer-menu">
              <a href="">Link1</a>
              {isLoggedIn ? (
                <a href={this.props.userURL}>{this.props.user}</a>
              ) : (
                <a href="">Login</a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
