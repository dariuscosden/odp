import React, { Component } from 'react';
import Login from '../Auth/Auth';
import Dashboard from './Dashboard';

const axios = require('axios');

// admin global component
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      error: false,
      publish: false,
      perPage: 20,
      pageRequested: 1,
      initialPosts: false,
      currentPosts: false,
      initialNextPage: false,
      nextPage: false,
      initialPreviousPage: false,
      previousPage: false
    };
  }

  componentDidMount() {
    // checks for user
    const userState = JSON.parse(localStorage.getItem('userState'));
    if (userState) {
      try {
        this.setState({ user: userState });
      } catch (e) {
        // console.log(e);
      }
    }
    this.getPosts();
  }

  // gets initial posts from python
  getPosts = () => {
    axios
      .post('/admin', {
        posts: true,
        pageRequested: this.state.pageRequested,
        perPage: this.state.perPage
      })
      .then(response => {
        if (response.data[0].nextPage) {
          this.setState({
            initialNextPage: true,
            nextPage: true
          });
        }
        if (response.data[1].previousPage) {
          this.setState({
            initialPreviousPage: true,
            previousPage: true
          });
        }
        response.data.shift();
        response.data.shift();
        this.setState({
          initialPosts: JSON.stringify(response.data),
          currentPosts: JSON.stringify(response.data)
        });
      });
  };

  // gets the post info
  getPostIdText() {
    var postIdText = document.getElementById('postID').innerText;
    return postIdText;
  }

  getPostTitleText() {
    var postTitleText = document.getElementById('postTitleQuill').childNodes[0]
      .childNodes[0].innerText;
    return postTitleText;
  }

  getPostBodyHTML() {
    var postBodyHTML = document.getElementById('postBodyQuill').childNodes[1]
      .childNodes[0].innerHTML;
    return postBodyHTML;
  }

  createPost = e => {
    e.preventDefault();
    var postTitle = this.getPostTitleText();
    var postBody = this.getPostBodyHTML();
    var postCategory = 'Nouvelles';
    var postUser = this.state.user.username;

    axios
      .post('/adminPosts', {
        createPost: true,
        postTitle: postTitle,
        postBody: postBody,
        postCategory: postCategory,
        postUser: postUser
      })
      .then(response => {
        console.log(response.data);
        this.getPosts();
        this.setState({ publish: true });
      });
  };

  updatePost = e => {
    e.preventDefault();
    var postID = this.getPostIdText();
    var postTitle = this.getPostTitleText();
    var postBody = this.getPostBodyHTML();

    axios
      .post('/adminPosts', {
        updatePost: true,
        postID: postID,
        postTitle: postTitle,
        postBody: postBody
      })
      .then(response => {
        this.getPosts();
        this.setState({ publish: true });
      });
  };

  deletePost = e => {
    e.preventDefault();
    var postID = this.getPostIdText();

    axios
      .post('/adminPosts', {
        deletePost: true,
        postID: postID
      })
      .then(response => {
        console.log(response.data);
        this.getPosts();
        this.setState({ publish: true });
      });
  };

  getNextPage = e => {
    e.preventDefault();
    axios
      .post('/adminPosts', {
        getNextPage: true,
        perPage: this.state.perPage,
        pageRequested: this.state.pageRequested + 1
      })
      .then(response => {
        this.setState({ pageRequested: this.state.pageRequested + 1 });
        if (response.data[0].nextPage) {
          this.setState({ nextPage: true });
        } else {
          this.setState({ nextPage: false });
        }
        if (response.data[1].previousPage) {
          this.setState({ previousPage: true });
        } else {
          this.setState({ previousPage: false });
        }
        response.data.shift();
        response.data.shift();
        this.setState({ currentPosts: JSON.stringify(response.data) });
      });
  };

  getPrevPage = e => {
    e.preventDefault();
    axios
      .post('/adminPosts', {
        getNextPage: true,
        perPage: this.state.perPage,
        pageRequested: this.state.pageRequested - 1
      })
      .then(response => {
        this.setState({ pageRequested: this.state.pageRequested - 1 });
        if (response.data[0].nextPage) {
          this.setState({ nextPage: true });
        } else {
          this.setState({ nextPage: false });
        }
        if (response.data[1].previousPage) {
          this.setState({ previousPage: true });
        } else {
          this.setState({ previousPage: false });
        }
        response.data.shift();
        response.data.shift();
        this.setState({ currentPosts: JSON.stringify(response.data) });
      });
  };

  // handles the login
  handleLogin = e => {
    e.preventDefault();
    const loginFormInput = {};
    e.target.childNodes.forEach(event => {
      if (event.tagName === 'INPUT' && event.type != 'submit') {
        loginFormInput[event.name] = event.value;
        event.value = null;
      }
    });

    // sends data to python
    axios({
      method: 'post',
      url: window.location.href,
      data: { loginFormInput }
    })
      .then(response => {
        const user = response.data;
        if (user.authenticated) {
          this.setState({
            user: {
              authenticated: true,
              id: user.userID,
              username: user.username
            },
            error: false
          });
          localStorage.setItem('userState', JSON.stringify(this.state.user));
        } else {
          this.setState({
            error: { type: 'login', message: 'Incorrect username or password' }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // handles the logout
  handleLogout = e => {
    e.preventDefault();
    this.setState({ user: false });
    localStorage.clear();
  };

  // searches for posts
  searchPosts = e => {
    e.preventDefault();
    var searchInput = e.target.childNodes[0].value;
    if (searchInput) {
      axios
        .post('/adminPosts', {
          searchPosts: searchInput,
          pageRequested: 1,
          perPage: this.state.perPage
        })
        .then(response => {
          if (response.data) {
            if (response.data[0].nextPage) {
              this.setState({ nextPage: true });
            } else {
              this.setState({ nextPage: false });
            }
            if (response.data[1].previousPage) {
              this.setState({ previousPage: true });
            } else {
              this.setState({ previousPage: false });
            }
            response.data.shift();
            response.data.shift();
            this.setState({
              currentPosts: JSON.stringify(response.data),
              pageRequested: 1
            });
          }
        });
    } else {
      this.setState({
        currentPosts: this.state.initialPosts,
        pageRequested: 1,
        nextPage: this.state.initialNextPage,
        previousPage: this.state.initialPreviousPage
      });
    }
  };

  render() {
    let render;
    if (this.state.user) {
      return (
        <Dashboard
          publish={this.state.publish}
          onLogout={this.handleLogout}
          posts={this.state.currentPosts}
          searchPosts={this.searchPosts}
          previousPage={this.state.previousPage}
          nextPage={this.state.nextPage}
          getPrevPage={this.getPrevPage}
          getNextPage={this.getNextPage}
          createPost={this.createPost}
          updatePost={this.updatePost}
          deletePost={this.deletePost}
        />
      );
    } else {
      return (
        <>
          <Login error={this.state.error} onSubmit={this.handleLogin} />
        </>
      );
    }
  }
}

export default Admin;
