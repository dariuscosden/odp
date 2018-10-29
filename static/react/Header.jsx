import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Logout from './Auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="headerContainer">
        <div className="container">
          <div className="headerContainer-flex">
            <div className="headerContainer-logo">
              <h1>Ouate de phoque</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
