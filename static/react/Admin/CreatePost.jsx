import React, { Component } from 'react';
import ReactQuill, { EditorState } from 'react-quill';
import {
  PostTitleEditor,
  PostBodyEditor,
  PostImageEditor,
  PostCategoryEditor
} from './AdminPost';
import FeedPost from '../Blog/Feed/FeedPost';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.postImageEditor = React.createRef();
    this.postTitleEditor = React.createRef();
    this.postBodyEditor = React.createRef();
    this.postCategoryEditor = React.createRef();
    this.state = {
      postImage: this.props.postImage,
      postTitle: this.props.postTitle,
      postBody: this.props.postBody,
      postCategory: this.props.postCategory
    };
  }

  getPostBodyHTML() {
    var postBodyHTML = document.getElementById('postBodyQuill').childNodes[1]
      .childNodes[0].innerHTML;
    return postBodyHTML;
  }

  updateImage = () => {
    const postImage = document.getElementById('postImageQuill').childNodes[1]
      .childNodes[0].innerHTML;
    this.setState({ postImage: postImage });
  };

  updateTitle = () => {
    const postTitle = this.postTitleEditor.current.reactQuill.current.editor.getText();
    this.setState({ postTitle: postTitle });
  };

  updateCategory = () => {
    const postCategory = this.postCategoryEditor.current.reactQuill.current.editor.getText();
    this.setState({ postCategory: postCategory });
  };

  updateBody = () => {
    const postBody = this.getPostBodyHTML();
    this.setState({ postBody: postBody });
  };

  render() {
    return (
      <>
        <div className="adminPost-topPostInfo">
          <div className="adminPost-topPostInfo-left">
            <a className="mainLink" href="javascript:history.back()">
              ←
            </a>
          </div>
        </div>
        <div className="adminPost-flex">
          <div className="adminPost-postEdit">
            <div className="adminPost-header">
              <div className="adminPost-image">
                <span className="headingOneHalf">Image</span>
                <PostImageEditor
                  ref={this.postImageEditor}
                  postImage={this.props.postImage}
                  onEditText={this.updateImage}
                />
              </div>
              <div className="adminPost-title">
                <span className="headingOneHalf">Title</span>
                <PostTitleEditor
                  ref={this.postTitleEditor}
                  postTitle={this.props.postTitle}
                  onEditText={this.updateTitle}
                />
              </div>
              <div className="adminPost-category">
                <span className="headingOneHalf">Category</span>
                <PostCategoryEditor
                  ref={this.postCategoryEditor}
                  postCategory={this.props.postCategory}
                  onEditText={this.updateCategory}
                />
              </div>
              <div id="adminPost-body" className="adminPost-body">
                <span className="headingOneHalf">Body</span>
                <PostBodyEditor
                  ref={this.postBodyEditor}
                  postBody={this.props.postBody}
                  onEditText={this.updateBody}
                />
              </div>
              <center>
                <a
                  href=""
                  className="mainButton"
                  onClick={this.props.createPost}
                >
                  Create Post
                </a>
              </center>
            </div>
          </div>
          <div className="adminPost-postDetails">
            <span className="headingTwo bold">
              <center>Post Preview</center>
            </span>
            <div className="adminPost-postPreview">
              <FeedPost
                postDateCreated={this.props.postDateCreated}
                postTitle={this.state.postTitle}
                postExcerp={this.state.postBody}
                postCategory={this.state.postCategory}
                postImage={this.state.postImage}
              />
            </div>
          </div>
        </div>
        <div className="scrollPastBottom" />
      </>
    );
  }
}

export default CreatePost;
