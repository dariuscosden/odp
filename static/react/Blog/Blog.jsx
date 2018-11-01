import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// global blog component
class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.marginTop} className="backgroundContainer">
        <div className="container">
          <div className="blogContainer">
            <div className="sidebarContainer">
              <SidebarLeft />
            </div>
            <Feed
              posts={this.props.posts}
              getMorePosts={this.props.getMorePosts}
              morePostsAvailable={this.props.morePostsAvailable}
            />
            <div className="sidebarContainer">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;

// blog feed
class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // gets posts from props
    var jsonPosts = JSON.parse(this.props.posts);
    var arr = [];
    Object.keys(jsonPosts).forEach(function(key) {
      arr.push(jsonPosts[key]);
    });
    return (
      <Router>
        <div className="feedContainer-flex">
          {arr.map(post => (
            <div className="postContainer" key={post.id}>
              <div className="postContainer-hr">
                <hr />
              </div>
              <div className="postContainer-img">
                <img src="https://i.kinja-img.com/gawker-media/image/upload/s--IoFa6NEN--/c_scale,f_auto,fl_progressive,q_80,w_800/vub3vgkwxnuwwj36emni.jpg" />
              </div>

              <div className="postContainer-dateCreated">
                <small>
                  <i>{post.dateCreated}</i>
                </small>
              </div>
              <div className="postContainer-title">
                <Link to={'/' + post.slug}>{post.title}</Link>
              </div>
              <div className="postContainer-body">{post.excerp}</div>
            </div>
          ))}
          {this.props.morePostsAvailable ? (
            <a
              className="mainButton ease03"
              href=""
              onClick={this.props.getMorePosts}
            >
              Plus d'articles
            </a>
          ) : null}
        </div>
      </Router>
    );
  }
}

// blog sidebarRight
class SidebarRight extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p>Sidebar Right</p>;
  }
}

// blog sidebarLeft
class SidebarLeft extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p>Sidebar Left</p>;
  }
}
