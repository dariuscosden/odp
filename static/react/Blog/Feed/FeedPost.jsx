import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FeedPost extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="postContainer">
        <div className="postContainer-separator">
          <div className="postContainer-separatorText">
            {this.props.postCategory}
          </div>
        </div>
        <div className="postContainer-img">
          <img src="https://i.kinja-img.com/gawker-media/image/upload/s--IoFa6NEN--/c_scale,f_auto,fl_progressive,q_80,w_800/vub3vgkwxnuwwj36emni.jpg" />
        </div>

        <div className="postContainer-dateCreated">
          <small>
            <i>{this.props.postDateCreated}</i>
          </small>
        </div>
        <div className="postContainer-title">
          <Link to={'/' + this.props.postSlug}>{this.props.postTitle}</Link>
        </div>
        <div className="postContainer-body">
          {this.props.postExcerp}{' '}
          <Link to={'/' + this.props.postSlug}>Article complet</Link>
        </div>
      </div>
    );
  }
}

export default FeedPost;
