import React, { Component } from 'react';
import SidebarPost from '../Post/SidebarPost';

const axios = require('axios');

// blog sidebarLeft
class SidebarLeft extends Component {
  constructor(props) {
    super(props);
  }

  insertSidebarAd = () => {
    if (this.props.ads) {
      const ads = JSON.parse(this.props.ads);
      var adContent = '';
      ads.map(ad => {
        if (ad.type === 'sidebar') {
          adContent = ad.content;
        }
      });
    }
    return { __html: adContent };
  };

  render() {
    return (
      <div
        className="sidebarContainer-left"
        dangerouslySetInnerHTML={this.insertSidebarAd()}
      />
    );
  }
}

// blog sidebarRight
class SidebarRight extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: null };
  }

  componentWillMount = () => {
    this.getCategories();
  };

  // gets categories from python
  getCategories = () => {
    axios
      .post(window.location.href, {
        categories: true,
        perPage: this.props.perPage
      })
      .then(response => {
        this.setState({ categories: response.data });
      });
  };

  render() {
    return (
      <div className="sidebarContainer">
        <span className="headingOneHalf bold">Catégories</span>
        {this.state.categories
          ? this.state.categories.map(category => (
              <a
                href=""
                key={category}
                className="sidebarFilter-link"
                onClick={this.props.filterByCategory}
              >
                {category}
              </a>
            ))
          : null}
      </div>
    );
  }
}

class PostSidebarRight extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // gets posts from props
    var jsonPosts = JSON.parse(this.props.posts);
    var arr = [];
    Object.keys(jsonPosts).forEach(key => {
      if (arr.length <= 10 && jsonPosts[key].id != this.props.postID) {
        arr.push(jsonPosts[key]);
      }
    });

    return (
      <div className="sidebarContainer">
        <div className="sidebarPost-flex">
          {arr.map(post => (
            <SidebarPost
              key={post.id}
              postSlug={post.slug}
              postTitle={post.title}
              postCategory={post.category}
              postImage={post.image}
            />
          ))}
        </div>
      </div>
    );
  }
}

export { SidebarLeft, SidebarRight, PostSidebarRight };
