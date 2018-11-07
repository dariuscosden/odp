import React, { Component } from 'react';
import ReactQuill, { EditorState } from 'react-quill';
import { PostTitleEditor, PostBodyEditor } from './AdminPost';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.PostTitleEditor = React.createRef();
    this.PostBodyEditor = React.createRef();
  }
  render() {
    return (
      <div className="createPost-container">
        <span className="headingTwo accentColor bold">Create Post</span>
        <br />
        <span>Title</span>
        <PostTitleEditor
          ref={this.postTitleEditor}
          postTitle={this.props.postTitle}
        />
        <br />
        <span>Body</span>
        <PostBodyEditor
          ref={this.postBodyEditor}
          postBody={this.props.postBody}
        />
        <br />
        <a href="" className="mainButton" onClick={this.props.createPost}>
          Create Post
        </a>
      </div>
    );
  }
}

export default CreatePost;
