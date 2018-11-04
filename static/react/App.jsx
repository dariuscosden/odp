import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Blog from './Blog/Blog';
import Admin from './Admin/Admin';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosts: false,
      currentPosts: false,
      pagesRequested: 10,
      morePostsAvailable: false
    };
  }

  componentWillMount = () => {
    this.getPosts();
  };

  // gets initial posts from python
  getPosts = () => {
    axios
      .post(window.location.href, {
        posts: true,
        pagesRequested: this.state.pagesRequested
      })
      .then(response => {
        if (response.data[0].morePostsAvailable) {
          this.setState({ morePostsAvailable: true });
        }
        response.data.shift();
        this.setState({
          initialPosts: JSON.stringify(response.data),
          currentPosts: JSON.stringify(response.data)
        });
      });
  };

  // gets more posts
  getMorePosts = e => {
    e.preventDefault();
    this.setState({ pagesRequested: (this.state.pagesRequested += 10) });
    axios
      .post(window.location.href, {
        posts: true,
        pagesRequested: this.state.pagesRequested
      })
      .then(response => {
        if (response.data[0].morePostsAvailable) {
          this.setState({ morePostsAvailable: true });
        } else {
          this.setState({ morePostsAvailable: false });
        }
        response.data.shift();
        this.setState({
          currentPosts: JSON.stringify(response.data)
        });
      });
  };

  // handles post filters
  filterByCategory = e => {
    e.preventDefault();
    const target = e.target;
    axios
      .post(window.location.href, {
        category: target.text,
        pagesRequested: this.state.pagesRequested
      })
      .then(response => {
        target.parentNode.childNodes.forEach(function(e) {
          e.classList.remove('sidebarFilter-linkActive');
        });
        target.classList.add('sidebarFilter-linkActive');
        response.data.shift();
        if (this.state.currentPosts === JSON.stringify(response.data)) {
          target.classList.remove('sidebarFilter-linkActive');
          this.setState({ currentPosts: this.state.initialPosts });
        } else {
          this.setState({
            currentPosts: JSON.stringify(response.data)
          });
        }
      });
  };

  render() {
    return (
      <Switch>
        <Route path="/admin" render={() => <Admin />} />
        <Route
          path="/"
          render={({ match }) => (
            <Blog
              posts={this.state.currentPosts}
              getMorePosts={this.getMorePosts}
              morePostsAvailable={this.state.morePostsAvailable}
              match={match}
              pagesRequested={this.state.pagesRequested}
              filterByCategory={this.filterByCategory}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
