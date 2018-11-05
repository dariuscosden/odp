import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header from './Header';
import Soumettre from './Soumettre';
import Feed from './Feed/Feed';
import { SidebarLeft, SidebarRight } from './Feed/Sidebar';
import BlogPost from './Post/BlogPost';

// global blog component
class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { marginTop: { marginTop: 0 } };
  }

  // gets the header height
  getHeaderHeight = header => {
    var headerHeight = header.offsetHeight;
    this.setState({ marginTop: { marginTop: headerHeight } });
  };

  render() {
    return (
      <>
        <Header getHeight={this.getHeaderHeight} />
        <div style={this.state.marginTop} className="backgroundContainer">
          <div className="container">
            <div className="blogContainer">
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <SidebarLeft />
                    <Feed
                      posts={this.props.posts}
                      getMorePosts={this.props.getMorePosts}
                      morePostsAvailable={this.props.morePostsAvailable}
                    />
                    <SidebarRight
                      perPage={this.props.perPage}
                      filterByCategory={this.props.filterByCategory}
                    />
                  </>
                )}
              />
              <Route path="/soumettre" component={Soumettre} />
              <Route
                path="/:postSlug"
                render={props => {
                  const posts = JSON.parse(this.props.posts);
                  const post = posts.find(
                    p => p.slug === props.match.params.postSlug
                  );
                  if (!post) {
                    return null;
                  }
                  return (
                    <BlogPost
                      {...props}
                      postDateCreated={post.dateCreated}
                      postSlug={post.slug}
                      postTitle={post.title}
                      postBody={post.body}
                      postCategory={post.category}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Blog;
