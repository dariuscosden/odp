import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class AdminPosts extends Component {
  constructor(props) {
    super(props);
  }

  preventDefault = e => {
    e.preventDefault();
  };

  render() {
    const posts = JSON.parse(this.props.posts).map(post => (
      <li key={post.id}>
        <Link to={'/admin/posts/' + post.slug}>{post.title}</Link> <br />
        <small>
          <i>{post.dateCreated}</i>
        </small>
        <br />
        Posted by {post.user}
      </li>
    ));
    return (
      <div className="adminPosts-container">
        <div className="adminPosts-flex">
          <div className="adminPosts-header">
            <span className="headingThree bold">Manage your posts</span>
            <br />
            <span className="headingTwo">Public posts</span>
          </div>
          <div className="adminPosts-search">
            <form
              className="adminPosts-searchForm"
              onSubmit={this.props.searchPosts}
            >
              <input type="text" placeholder="search posts" />
              <input type="submit" value="search" />
            </form>
          </div>
        </div>
        <hr />
        <ul className="adminPosts-postList">{posts}</ul>
        {this.props.previousPage ? (
          <a href="" className="mainButton" onClick={this.props.getPrevPage}>
            Prev
          </a>
        ) : (
          <a
            href=""
            className="mainButton-greyed"
            onClick={this.preventDefault}
          >
            Prev
          </a>
        )}
        {this.props.nextPage ? (
          <a href="" className="mainButton" onClick={this.props.getNextPage}>
            Next
          </a>
        ) : (
          <a
            href=""
            className="mainButton-greyed"
            onClick={this.preventDefault}
          >
            Next
          </a>
        )}
      </div>
    );
  }
}

export default AdminPosts;
