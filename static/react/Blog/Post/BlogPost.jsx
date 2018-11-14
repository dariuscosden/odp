import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeedAd, { PostAd } from '../Ads';

class BlogPost extends Component {
  constructor(props) {
    super(props);
  }

  insertHTMLBody() {
    return { __html: this.props.postBody };
  }

  render() {
    // gets ads from props
    var jsonAds = JSON.parse(this.props.ads);
    var adsArr = [];
    Object.keys(jsonAds).forEach(function(key) {
      adsArr.push(jsonAds[key]);
    });

    return (
      <div className="postContainer">
        <div className="postContainer-feedAd">
          {adsArr.map(ad => {
            if (ad.type === 'feed') {
              return <PostAd adContent={ad.content} />;
            }
          })}
        </div>
        <Link to="/" className="mainLink">
          ← Retourner
        </Link>
        <br />
        <br />
        <div className="postContainer-img">
          <img src={this.props.postImage} />
        </div>

        <div className="postContainer-dateCreated">
          <small>
            <i>{this.props.postDateCreated}</i>
          </small>
        </div>
        <div className="postContainer-title">
          <span className="headingTwo bold">{this.props.postTitle}</span>
        </div>
        <div
          className="postContainer-body"
          dangerouslySetInnerHTML={this.insertHTMLBody()}
        />
      </div>
    );
  }
}

export default BlogPost;
