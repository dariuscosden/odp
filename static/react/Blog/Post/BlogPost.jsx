import React, { Component } from 'react';

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
        <div className="postContainer-img">
          <img src={this.props.postImage} />
        </div>

        <div className="postContainer-dateCreated">
          <small>
            <i>{this.props.postDateCreated}</i>
          </small>
        </div>
        <div className="postContainer-title">
          <h1>{this.props.postTitle}</h1>
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
