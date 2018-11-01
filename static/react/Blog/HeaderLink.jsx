import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HeaderLink extends Component {
  render() {
    return (
      <NavLink
        {...this.props}
        className="subHeader-menuLink"
        activeClassName="subHeader-menuLinkActive"
      />
    );
  }
}

export default HeaderLink;
