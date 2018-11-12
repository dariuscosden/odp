import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BlogPost extends Component {
  constructor(props) {
    super(props);
  }

  insertHTMLBody() {
    return { __html: this.props.postBody };
  }

  render() {
    return (
      <div className="postContainer">
        <Link to="/" className="mainLink">
          ←
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
