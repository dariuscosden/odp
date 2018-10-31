import React, { Component } from 'react';

// global blog component
class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="backgroundContainer">
        <div className="container">
          <div className="blogContainer">
            <SidebarLeft />
            <Feed
              posts={this.props.posts}
              getMorePosts={this.props.getMorePosts}
              morePostsAvailable={this.props.morePostsAvailable}
            />
            <SidebarRight />
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
            <div className="postContainer-title">{post.title}</div>
            <div className="postContainer-body">{post.body}</div>
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
    );
  }
}

// blog sidebarRight
class SidebarRight extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="sidebarContainer">SidebarRight</div>;
  }
}

// blog sidebarLeft
class SidebarLeft extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="sidebarContainer">SidebarLeft</div>;
  }
}
