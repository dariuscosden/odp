import React, { Component } from 'react';
import HeaderLink from './Links';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.header = React.createRef();
  }

  // componentDidMount = () => {
  //   this.props.getHeight(this.header.current);
  // };

  render() {
    return (
      <>
        <div ref={this.header} className="headerContainer-fixed">
          <div className="headerContainer">
            <div className="container">
              <div className="headerContainer-flex">
                <div className="headerContainer-logo">
                  <h1>Ouate de phoque</h1>
                </div>
                <div className="headerContainer-phoque">
                  <img src="dist/images/odp-phoque.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;

class SubHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="subHeader-flex">
          <div className="subHeader-left20">
            <div className="float-left">Suivez-nous!</div>
            <div className="float-right">
              <a target="_blank" href="https://www.facebook.com/ouatedephoque/">
                <i className="fab fa-facebook-f" />
              </a>
            </div>
          </div>
          <div className="subHeader-middle60" />
          <div className="subHeader-right20">En savoir plus</div>
        </div>
      </div>
    );
  }
}

export { SubHeader };
