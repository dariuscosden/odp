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
              {isLoggedIn ? <a href="/admin">Admin</a> : false}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
