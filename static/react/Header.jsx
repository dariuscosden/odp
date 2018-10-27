import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Logout from './Logout';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const user = this.props.user;
    let menuLinks;
    if (user) {
      menuLinks = (
        <>
          <a href="/admin">Admin</a>
          <Logout onLogout={this.props.onLogout} />
        </>
      );
    } else {
      menuLinks = false;
    }
    return (
      <div className="headerContainer">
        <div className="container">
          <div className="headerContainer-flex">
            <div className="headerContainer-logo">
              <h1>Ouate de phoque</h1>
            </div>
            <div className="headerContainer-menu">{menuLinks}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
