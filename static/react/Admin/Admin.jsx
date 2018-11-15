import React, { Component } from 'react';
import Login, { InitializeApp } from '../Auth/Auth';
import Dashboard from './Dashboard';

const axios = require('axios');

// admin global component
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      showInsertDummyData: false,
      message: false,
      user: false,
      error: false,
      publish: false,

      // ads
      ads: false,

      // posts
      perPage: 20,
      pageRequested: 1,
      initialPosts: false,
      currentPosts: false,
      initialNextPage: false,
      nextPage: false,
      initialPreviousPage: false,
      previousPage: false,

      // users
      usersPerPage: 20,
      usersPageRequested: 1,
      initialUsers: false,
      currentUsers: false
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
    this.checkForInitialization();
    this.getAds();
    this.getPosts();
    this.getUsers();
    this.checkForDummyData();
  }

  // handles initialization of app
  checkForInitialization = () => {
    axios.post('/admin', { initialization: true }).then(response => {
      if (response.data.initialized) {
        this.setState({ initialized: true });
      }
    });
  };

  // checks for dummy data
  checkForDummyData = () => {
    axios.post('/admin', { checkForDummyData: true }).then(response => {
      if (!response.data.checkForDummyData) {
        this.setState({ showInsertDummyData: true });
      }
    });
  };

  // initializes the backend account
  initializeBackEnd = e => {
    e.preventDefault();
    const initializationFormInput = {};
    e.target.childNodes.forEach(event => {
      if (event.tagName === 'INPUT' && event.type != 'submit') {
        initializationFormInput[event.name] = event.value;
        event.value = null;
      }
    });

    // sends data to python
    axios({
      method: 'post',
      url: '/admin',
      data: { initializationFormInput }
    }).then(response => {
      if (response.data.initialized) {
        this.setState({
          initialized: true,
          user: {
            authenticated: true,
            id: response.data.userID,
            username: response.data.username
          },
          error: false,
          message: {
            type: 'success',
            content: 'You have successfully initialized the application'
          }
        });
        localStorage.setItem('userState', JSON.stringify(this.state.user));
        this.getUsers();
      } else {
        this.setState({
          error: {
            type: 'login',
            message: 'Something went wrong while initializing the account'
          }
        });
      }
      setTimeout(() => {
        this.setState({ message: false });
      }, 5000);
    });
  };

  // inserts dummy data
  insertDummyData = e => {
    e.preventDefault();
    axios
      .post('/admin', { insertDummyData: true, userID: this.state.user.id })
      .then(response => {
        if (response.data.insertDummyData) {
          this.getPosts();
          this.setState({
            showInsertDummyData: false,
            publish: true,
            message: {
              type: 'success',
              content: 'Dummy data has been successfully inserted'
            }
          });
        }
        setTimeout(() => {
          this.setState({ message: false });
        }, 5000);
      });
  };

  // gets the ads from python
  getAds = () => {
    axios.post('/', { ads: true }).then(response => {
      this.setState({ ads: JSON.stringify(response.data) });
    });
  };

  getFeedAdHTML() {
    var feedAdHTML = document.getElementById('feedAdTextArea').value;
    return feedAdHTML;
  }

  getSidebarAdHTML() {
    var sidebarAdHTML = document.getElementById('sidebarAdTextArea').value;
    return sidebarAdHTML;
  }

  // update ads
  updateAds = e => {
    e.preventDefault();
    var feedAd = this.getFeedAdHTML();
    var sidebarAd = this.getSidebarAdHTML();
    axios
      .post('/adminAds', {
        updateAds: true,
        feedAd: feedAd,
        sidebarAd: sidebarAd
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          ads: JSON.stringify(response.data),
          message: {
            type: 'success',
            content: 'Ads have been updated'
          },
          publish: true
        });
      });
    setTimeout(() => {
      this.setState({ message: false });
    }, 5000);
  };

  // gets initial users from python
  getUsers = () => {
    axios
      .post('/admin', {
        users: true
      })
      .then(response => {
        this.setState({
          initialUsers: JSON.stringify(response.data),
          currentUsers: JSON.stringify(response.data)
        });
      });
  };

  // gets the user info
  getUserIdText() {
    var userIdText = document.getElementById('userID').innerText;
    return userIdText;
  }

  // gets the username
  getUsernameText() {
    var usernameText = document.getElementById('createUserUsername').value;
    if (usernameText.length <= 1) {
      usernameText = false;
    }
    return usernameText;
  }

  // gets the password
  getUserPasswordText() {
    var passwordText = document.getElementById('createUserPassword').value;
    if (passwordText.length <= 1) {
      passwordText = false;
    }
    return passwordText;
  }

  // creates user
  createUser = e => {
    e.preventDefault();
    var username = this.getUsernameText();
    var userPassword = this.getUserPasswordText();

    if (!username || !userPassword) {
      this.setState({
        message: {
          type: 'error',
          content: 'Please fill in all the required fields'
        }
      });
      setTimeout(() => {
        this.setState({ message: false });
      }, 5000);
      return false;
    }

    axios
      .post('/adminUsers', {
        createUser: true,
        username: username,
        userPassword: userPassword
      })
      .then(response => {
        if (!response.data.userExists) {
          this.getUsers();
          this.setState({
            message: {
              type: 'success',
              content: 'User has been successfully created.'
            },
            publish: true
          });
        } else {
          this.setState({
            message: {
              type: 'error',
              content: 'User already exists.'
            }
          });
        }
        setTimeout(() => {
          this.setState({ message: false });
        }, 5000);
      });
  };

  // updates the user
  updateUser = e => {
    e.preventDefault();
    var userID = this.getUserIdText();
    var username = this.getUsernameText();
    var userPassword = this.getUserPasswordText();

    axios
      .post('/adminUsers', {
        updateUser: true,
        userID: userID,
        username: username,
        userPassword: userPassword
      })
      .then(response => {
        if (response.data.userExists) {
          this.setState({
            message: { type: 'error', content: 'Username already taken.' }
          });
        } else {
          this.getUsers();
          this.setState({
            message: {
              type: 'success',
              content: 'User has been successfully updated'
            },
            publish: true
          });
        }
        setTimeout(() => {
          this.setState({ message: false });
        }, 5000);
      });
  };

  // deletes a user
  deleteUser = e => {
    e.preventDefault();
    var userID = this.getUserIdText();

    axios
      .post('/adminUsers', {
        deleteUser: true,
        userID: userID
      })
      .then(response => {
        if (response.data.userDeleted) {
          this.getUsers();
          this.setState({
            message: {
              type: 'success',
              content: 'User has been successfully deleted'
            },
            publish: true
          });
        } else {
          this.setState({
            message: {
              type: 'error',
              content: 'Cannot delete the last remaining account'
            }
          });
        }
        setTimeout(() => {
          this.setState({ message: false });
        }, 5000);
      });
  };

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

  getPostImageText() {
    var postImageText = document.getElementById('postImageQuill').childNodes[1]
      .childNodes[0].childNodes[0].innerText;
    return postImageText;
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

  getPostCategoryText() {
    var postCategoryText = document.getElementById('postCategoryQuill')
      .childNodes[0].childNodes[0].innerText;
    return postCategoryText;
  }

  createPost = e => {
    e.preventDefault();
    var postImage = this.getPostImageText();
    var postTitle = this.getPostTitleText();
    var postBody = this.getPostBodyHTML();
    var postCategory = this.getPostCategoryText();
    var postUser = this.state.user.username;

    axios
      .post('/adminPosts', {
        createPost: true,
        postImage: postImage,
        postTitle: postTitle,
        postBody: postBody,
        postCategory: postCategory,
        postUser: postUser
      })
      .then(response => {
        this.getPosts();
        this.setState({
          message: {
            type: 'success',
            content: 'Post has been successfully created'
          },
          publish: true
        });
        setTimeout(() => {
          this.setState({ message: false });
        }, 5000);
      });
  };

  updatePost = e => {
    e.preventDefault();
    var postID = this.getPostIdText();
    var postImage = this.getPostImageText();
    var postTitle = this.getPostTitleText();
    var postBody = this.getPostBodyHTML();
    var postCategory = this.getPostCategoryText();

    axios
      .post('/adminPosts', {
        updatePost: true,
        postID: postID,
        postImage: postImage,
        postTitle: postTitle,
        postBody: postBody,
        postCategory: postCategory
      })
      .then(response => {
        this.getPosts();
        this.setState({
          message: {
            type: 'success',
            content: 'Post has been successfully updated'
          },
          publish: true
        });
        setTimeout(() => {
          this.setState({ message: false });
        }, 5000);
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
        this.setState({
          message: {
            type: 'success',
            content: 'Post has been successfully deleted'
          },
          publish: true
        });
        setTimeout(() => {
          this.setState({ message: false });
        }, 5000);
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
      url: '/admin',
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
          // dummy data
          insertDummyData={this.insertDummyData}
          showInsertDummyData={this.state.showInsertDummyData}
          // ads
          ads={this.state.ads}
          updateAds={this.updateAds}
          message={this.state.message}
          publish={this.state.publish}
          onLogout={this.handleLogout}
          // posts
          posts={this.state.currentPosts}
          searchPosts={this.searchPosts}
          previousPage={this.state.previousPage}
          nextPage={this.state.nextPage}
          getPrevPage={this.getPrevPage}
          getNextPage={this.getNextPage}
          createPost={this.createPost}
          updatePost={this.updatePost}
          deletePost={this.deletePost}
          // users
          users={this.state.currentUsers}
          createUser={this.createUser}
          updateUser={this.updateUser}
          deleteUser={this.deleteUser}
        />
      );
    } else {
      if (this.state.initialized) {
        return <Login error={this.state.error} onSubmit={this.handleLogin} />;
      } else {
        return (
          <InitializeApp
            error={this.state.error}
            onSubmit={this.initializeBackEnd}
          />
        );
      }
    }
  }
}

export default Admin;
