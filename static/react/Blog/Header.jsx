import React, { Component } from 'react';
import HeaderLink from './Links';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.header = React.createRef();
  }

  componentDidMount = () => {
    this.props.getHeight(this.header.current);
  };

  render() {
    return (
      <div ref={this.header} className="headerContainer-fixed">
        <div className="headerContainer">
          <div className="container">
            <div className="headerContainer-flex">
              <div className="headerContainer-logo">
                <h1>Ouate de phoque</h1>
              </div>
              {/* <div className="headerContainer-phoque">
                <img src="dist/images/odp-phoque.png" />
              </div> */}
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

  render() {
    return (
      <div className="subHeaderContainer">
        <div className="container">
          <div className="subHeader-menuContainer">
            <HeaderLink exact to="/">
              Acceuil
            </HeaderLink>
            <HeaderLink to="/facebook">Facebook</HeaderLink>
            <HeaderLink to="/soumettre">Soumettre</HeaderLink>
          </div>
        </div>
      </div>
    );
  }
}
