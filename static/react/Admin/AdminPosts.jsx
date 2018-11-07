import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AdminPost from './AdminPost';

class AdminPosts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="adminPosts-container">
        <div className="adminPosts-flex">
          <div className="adminPosts-header">
            <span className="headingThree bold">Manage your blog</span>
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
        <Switch>
          <Route
            path="/admin/posts/:postSlug"
            render={props => {
              const posts = JSON.parse(this.props.posts);
              const post = posts.find(
                p => p.slug === props.match.params.postSlug
              );
              if (!post) {
                return null;
              }
              return (
                <AdminPost
                  {...props}
                  postID={post.id}
                  postDateCreated={post.dateCreated}
                  postSlug={post.slug}
                  postTitle={post.title}
                  postBody={post.body}
                  postCategory={post.category}
                  postUser={post.user}
                  updatePost={this.props.updatePost}
                />
              );
            }}
          />
          <Route
            path="/admin/posts"
            render={() => (
              <AdminPostList
                posts={this.props.posts}
                previousPage={this.props.previousPage}
                nextPage={this.props.nextPage}
                getNextPage={this.props.getNextPage}
                getPrevPage={this.props.getPrevPage}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default AdminPosts;

class AdminPostList extends Component {
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
        <small>
          Posted by{' '}
          <i>
            <b>{post.user}</b>
          </i>
        </small>
      </li>
    ));

    let previousPage;
    let nextPage;
    if (posts.length) {
      if (this.props.previousPage) {
        previousPage = (
          <a href="" className="mainButton" onClick={this.props.getPrevPage}>
            Prev
          </a>
        );
      } else {
        previousPage = (
          <a
            href=""
            className="mainButton-greyed"
            onClick={this.preventDefault}
          >
            Prev
          </a>
        );
      }
      if (this.props.nextPage) {
        nextPage = (
          <a href="" className="mainButton" onClick={this.props.getNextPage}>
            Next
          </a>
        );
      } else {
        nextPage = (
          <a
            href=""
            className="mainButton-greyed"
            onClick={this.preventDefault}
          >
            Next
          </a>
        );
      }
    } else {
      nextPage = 'No posts match your query.';
    }

    return (
      <div className="adminPosts-postsContainer">
        <span className="headingTwo bold">Posts</span>
        <ul className="adminPosts-postList">{posts}</ul>
        {previousPage}
        {nextPage}
      </div>
    );
  }
}
