import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header, { SubHeader } from './Header';
import Soumettre from './Soumettre';
import Feed from './Feed/Feed';
import { SidebarLeft, SidebarRight, PostSidebarRight } from './Feed/Sidebar';
import BlogPost from './Post/BlogPost';
import Axios from 'axios';

const axios = require('axios');

// global blog component
class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ads: false };
  }

  // gets the header height
  getHeaderHeight = header => {
    var headerHeight = header.offsetHeight;
    this.setState({ marginTop: { marginTop: headerHeight } });
  };

  componentWillMount = () => {
    this.getAds();
  };

  // gets the ads from python
  getAds = () => {
    axios.post('/', { ads: true }).then(response => {
      this.setState({ ads: JSON.stringify(response.data) });
    });
  };

  render() {
    return (
      <>
        <Header />
        <div className="subHeaderContainer">
          <SubHeader />
        </div>
        <div className="backgroundContainer">
          <div className="container">
            <div className="blogContainer">
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <SidebarLeft ads={this.state.ads} />
                    <Feed
                      posts={this.props.posts}
                      ads={this.state.ads}
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
              {this.props.posts ? (
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
                      <>
                        <SidebarLeft ads={this.state.ads} />
                        <BlogPost
                          {...props}
                          postDateCreated={post.dateCreated}
                          postSlug={post.slug}
                          postImage={post.image}
                          postTitle={post.title}
                          postBody={post.body}
                          postCategory={post.category}
                          ads={this.state.ads}
                        />
                        <PostSidebarRight
                          posts={this.props.posts}
                          postID={post.id}
                        />
                      </>
                    );
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Blog;
