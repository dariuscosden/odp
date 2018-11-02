import React, { Component } from 'react';

// blog sidebarLeft
class SidebarLeft extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="sidebarContainer">Sidebar Left</div>;
  }
}

// blog sidebarRight
class SidebarRight extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="sidebarContainer">Sidebar Right</div>;
  }
}

export { SidebarLeft, SidebarRight };
