import React, { Component } from 'react';

const axios = require('axios');

// blog sidebarLeft
class SidebarLeft extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="sidebarContainer">Ad</div>;
  }
}

// blog sidebarRight
class SidebarRight extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: null };
  }

  componentWillMount = () => {
    this.getCategories();
  };

  // gets categories from python
  getCategories = () => {
    axios
      .post(window.location.href, {
        categories: true,
        pagesRequested: this.props.pagesRequested
      })
      .then(response => {
        this.setState({ categories: response.data });
      });
  };

  render() {
    return (
      <div className="sidebarContainer">
        <h2>Categories</h2>
        {this.state.categories
          ? this.state.categories.map(category => (
              <a
                href=""
                key={category}
                className="sidebarFilter-link"
                onClick={this.props.filterByCategory}
              >
                {category}
              </a>
            ))
          : null}
      </div>
    );
  }
}

export { SidebarLeft, SidebarRight };
