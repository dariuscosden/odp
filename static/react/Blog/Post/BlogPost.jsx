import React, { Component } from 'react';

class BlogPost extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="postContainer">
        <div className="postContainer-hr">
          <hr />
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
          <h1>{this.props.postTitle}</h1>
        </div>
        <div className="postContainer-body">{this.props.postBody}</div>
      </div>
    );
  }
}

export default BlogPost;
