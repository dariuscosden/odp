import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FeedPost extends Component {
  constructor(props) {
    super(props);
  }

  insertHTMLImage() {
    var divHTML = this.props.postImage;
    if (divHTML.includes('div')) {
      divHTML = divHTML.replace(/<(.|\n)*?>/g, '');
    }
    var div = document.createElement('div');
    div.innerHTML = divHTML;
    if (this.props.postImage) {
      return { __html: "<img src='" + div.innerHTML + "' />" };
    }
  }

  insertHTMLBody() {
    return { __html: this.props.postExcerp };
  }

  insertHTMLAd() {
    return { __html: this.props.adContent };
  }

  render() {
    return (
      <>
        {this.props.ad ? (
          <div dangerouslySetInnerHTML={this.insertHTMLAd()} />
        ) : (
          <div className="feedPostContainer">
            {this.props.postImage ? (
              <Link to={'/' + this.props.postSlug}>
                <div
                  className="feedPostContainer-img"
                  dangerouslySetInnerHTML={this.insertHTMLImage()}
                />
              </Link>
            ) : null}
            <div className="feedPostContainer-dateCreated">
              <small>
                <i>{this.props.postDateCreated}</i>
                <br />
                <span className="funkyColor">
                  <b>
                    <i>{this.props.postCategory}</i>
                  </b>
                </span>
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
                <Link className="mainLink" to={'/' + this.props.postSlug}>
                  Article Complet <i className="far fa-newspaper" />
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </>
    );
  }
}

export default FeedPost;
