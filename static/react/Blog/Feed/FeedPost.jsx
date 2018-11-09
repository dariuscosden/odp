import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FeedPost extends Component {
  constructor(props) {
    super(props);
  }

  insertHTMLImage() {
    var divHTML = this.props.postImage;
    var div = document.createElement('div');
    div.innerHTML = divHTML;
    if (this.props.postImage) {
      return { __html: "<img src='" + div.childNodes[0].innerHTML + "' />" };
    }
  }

  insertHTMLBody() {
    return { __html: this.props.postExcerp };
  }

  render() {
    return (
      <div className="feedPostContainer">
        <div className="feedPostContainer-separator">
          <div className="feedPostContainer-separatorText">
            {this.props.postCategory}
          </div>
        </div>
        {this.props.postImage ? (
          <div
            className="feedPostContainer-img"
            dangerouslySetInnerHTML={this.insertHTMLImage()}
          />
        ) : null}
        <div className="feedPostContainer-dateCreated">
          <small>
            <i>{this.props.postDateCreated}</i>
          </small>
        </div>
        <div className="feedPostContainer-title">
          <Link to={'/' + this.props.postSlug}>{this.props.postTitle}</Link>
        </div>
        <div
          className="feedPostContainer-body"
          dangerouslySetInnerHTML={this.insertHTMLBody()}
        />
        {this.props.postSlug ? (
          <div className="feedPostContainer-readMore">
            <Link to={'/' + this.props.postSlug}>Article complet</Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FeedPost;
