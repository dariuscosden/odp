import React, { Component } from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="headerContainer-fixed">
        <div className="headerContainer">
          <div className="container">
            <div className="headerContainer-flex">
              <div className="headerContainer-logo">
                <h1>
                  <span>Ouate de phoque</span>
                </h1>
              </div>
              <div className="headerContainer-phoque">
                <img src="dist/images/odp-phoque.png" />
              </div>
            </div>
          </div>
        </div>
        <SubHeader />
      </div>
    );
  }
}

export default Header;

class SubHeader extends Component {
  constructor(props) {
    super(props);
  }

  clickChild = e => {
    e.firstChild(function() {
      this.click();
    });
  };

  render() {
    return (
      <div className="subHeaderContainer">
        <div className="container">
          <div className="subHeader-menuContainer">
            <div
              className="subHeader-menuItem"
              onClick={() => {
                this.clickChild();
              }}
            >
              <a href="/acceuil">Acceuil</a>
            </div>
            <div className="subHeader-menuItem">
              <a href="/nouvelles">Nouvelles</a>
            </div>
            <div className="subHeader-menuItem">
              <a href="/contact">Contact</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
