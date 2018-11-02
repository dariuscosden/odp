import React, { Component } from 'react';
import FeedPost from './FeedPost';

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
          <FeedPost
            key={post.id}
            postDateCreated={post.dateCreated}
            postSlug={post.slug}
            postTitle={post.title}
            postExcerp={post.excerp}
            postCategory={post.category}
          />
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

export default Feed;
