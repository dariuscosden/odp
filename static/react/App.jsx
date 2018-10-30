import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Blog from './Blog/Blog';
import Admin from './Admin/Admin';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: false,
      pagesRequested: 1,
      morePostsAvailable: false
    };
  }

  componentWillMount = () => {
    // gets the posts
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
      <Router>
        <Switch>
          <Route
            exact={true}
            path="/"
            render={() => (
              <Blog
                posts={this.state.posts}
                getMorePosts={this.getMorePosts}
                morePostsAvailable={this.state.morePostsAvailable}
              />
            )}
          />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    );
  }
}

export default App;
