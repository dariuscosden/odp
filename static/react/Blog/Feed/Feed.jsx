import React, { Component } from 'react';
import FeedPost from './FeedPost';
import FeedAd from '../Ads';

// blog feed
class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // gets posts from props
    var jsonPosts = JSON.parse(this.props.posts);
    var postsArr = [];
    Object.keys(jsonPosts).forEach(function(key) {
      postsArr.push(jsonPosts[key]);
    });

    // gets ads from props
    var jsonAds = JSON.parse(this.props.ads);
    var adsArr = [];
    Object.keys(jsonAds).forEach(function(key) {
      adsArr.push(jsonAds[key]);
    });

    return (
      <div className="feedContainer-flex">
        {postsArr.map(post => {
          if (post.id % 4 === 0) {
            return adsArr.map(ad => {
              if (ad.type == 'feed') {
                return (
                  <>
                    <FeedAd key={ad.id} adContent={ad.content} />
                    <FeedPost
                      key={post.id}
                      postDateCreated={post.dateCreated}
                      postSlug={post.slug}
                      postTitle={post.title}
                      postExcerp={post.excerp}
                      postCategory={post.category}
                      postImage={post.image}
                      ad={post.ad}
                      adContent={post.adContent}
                    />
                  </>
                );
              }
            });
          }
          return (
            <FeedPost
              key={post.id}
              postDateCreated={post.dateCreated}
              postSlug={post.slug}
              postTitle={post.title}
              postExcerp={post.excerp}
              postCategory={post.category}
              postImage={post.image}
              ad={post.ad}
              adContent={post.adContent}
            />
          );
        })}
      </div>

      // <div className="feedContainer-flex">
      //   {postsArr.map(post => (
      //     <FeedPost
      //       key={post.id}
      //       postDateCreated={post.dateCreated}
      //       postSlug={post.slug}
      //       postTitle={post.title}
      //       postExcerp={post.excerp}
      //       postCategory={post.category}
      //       postImage={post.image}
      //       ad={post.ad}
      //       adContent={post.adContent}
      //     />
      //   ))}
      //   {this.props.morePostsAvailable ? (
      //     <a
      //       className="mainButton ease03"
      //       href=""
      //       onClick={this.props.getMorePosts}
      //     >
      //       Plus d'articles
      //     </a>
      //   ) : null}
      // </div>
    );
  }
}

export default Feed;
