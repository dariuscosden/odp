import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Blog from './Blog/Blog';
import Admin from './Admin/Admin';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: false,
      pagesRequested: 10,
      morePostsAvailable: false
    };
  }

  componentWillMount = () => {
    this.getPosts();
  };

  // gets posts from python
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
          posts: JSON.stringify(response.data)
        });
      });
  };

  // gets more posts
  getMorePosts = e => {
    e.preventDefault();
    this.setState({ pagesRequested: (this.state.pagesRequested += 1) });
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
          posts: JSON.stringify(response.data)
        });
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
              posts={this.state.posts}
              getMorePosts={this.getMorePosts}
              morePostsAvailable={this.state.morePostsAvailable}
              match={match}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
