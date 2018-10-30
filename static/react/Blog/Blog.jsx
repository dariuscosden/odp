import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// global blog component
class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="blogContainer">
          <Feed
            posts={this.props.posts}
            getMorePosts={this.props.getMorePosts}
            morePostsAvailable={this.props.morePostsAvailable}
          />
          <Sidebar />
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
      <div className="feedContainer-flex">
        {arr.map(post => (
          <div className="postContainer" key={post.id}>
            <div className="postContainer-title">{post.title}</div>
            <div className="postContainer-author">
              Publié par{' '}
              <i>
                <span className="mainColor-dark bold">{post.user}</span>
              </i>
            </div>
            <div className="postContainer-dateCreated">
              <small>
                <i>{post.dateCreated}</i>
              </small>
            </div>
            <hr />
            <div className="postContainer-body">{post.body}</div>
          </div>
        ))}
        {this.props.morePostsAvailable ? (
          <a
            class="mainButton ease03"
            href=""
            onClick={this.props.getMorePosts}
          >
            Plus d'articles
          </a>
        ) : null}
      </div>
    );
  }
}

// blog sidebar
class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="sidebarContainer">Sidebar</div>;
  }
}
