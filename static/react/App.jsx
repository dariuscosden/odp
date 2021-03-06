import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Blog from './Blog/Blog';
import Admin from './Admin/Admin';
import {
  SidebarLeft,
  SidebarRight,
  PostSidebarRight
} from './Blog/Feed/Sidebar';
import BlogPost from './Blog/Post/BlogPost';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosts: false,
      currentPosts: false,
      pageRequested: 1,
      perPage: 10,
      morePostsAvailable: false
    };
  }

  componentWillMount = () => {
    this.getPosts();
  };

  // gets initial posts from python
  getPosts = () => {
    axios
      .post('/admin', {
        posts: true,
        perPage: this.state.perPage
      })
      .then(response => {
        if (response.data[0].nextPage) {
          this.setState({ morePostsAvailable: true });
        }
        response.data.shift();
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
    this.setState({ perPage: (this.state.perPage += 10) });
    axios
      .post('/admin', {
        posts: true,
        perPage: this.state.perPage
      })
      .then(response => {
        if (response.data[0].nextPage) {
          this.setState({ morePostsAvailable: true });
        } else {
          this.setState({ morePostsAvailable: false });
        }
        response.data.shift();
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
        perPage: this.state.perPage
      })
      .then(response => {
        target.parentNode.childNodes.forEach(function(e) {
          e.classList.remove('sidebarFilter-linkActive');
        });
        target.classList.add('sidebarFilter-linkActive');
        response.data.shift();
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
        <Route
          path="/admin"
          render={() => (
            <Admin ads={this.state.ads} updateAds={this.updateAds} />
          )}
        />
        <Route
          path="/"
          render={({ match }) => (
            <Blog
              posts={this.state.currentPosts}
              getMorePosts={this.getMorePosts}
              morePostsAvailable={this.state.morePostsAvailable}
              match={match}
              perPage={this.state.perPage}
              filterByCategory={this.filterByCategory}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
