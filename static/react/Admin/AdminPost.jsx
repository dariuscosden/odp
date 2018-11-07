import React, { Component } from 'react';
import ReactQuill, { EditorState } from 'react-quill';

const axios = require('axios');

class AdminPost extends React.Component {
  constructor(props) {
    super(props);
    this.postTitleEditor = React.createRef();
    this.postBodyEditor = React.createRef();
    this.state = { deleteConfirmation: false };
  }

  confirmDeletion = e => {
    e.preventDefault();
    this.setState({ deleteConfirmation: true });
  };

  cancelDeletion = e => {
    e.preventDefault();
    this.setState({ deleteConfirmation: false });
  };

  render() {
    return (
      <div className="adminPost-flex">
        <div className="adminPost-postEdit">
          <div className="adminPost-header">
            <span className="headingOneHalf">Title</span>
            <PostTitleEditor
              ref={this.postTitleEditor}
              postTitle={this.props.postTitle}
            />
          </div>
          <div id="adminPost-body" className="adminPost-body">
            <span className="headingOneHalf">Body</span>
            <PostBodyEditor
              ref={this.postBodyEditor}
              postBody={this.props.postBody}
              // onEditText={this.updatePost}
            />
          </div>
          <a href="" className="mainButton" onClick={this.props.updatePost}>
            Save Changes
          </a>
        </div>
        <div className="adminPost-postDetails">
          <small>
            Post id
            {': '}
            <i>
              <b id="postID">{this.props.postID}</b>
            </i>
          </small>
          <br />
          <small>
            Posted on{' '}
            <i>
              <b>{this.props.postDateCreated}</b>
            </i>
          </small>
          <br />
          <small>
            Posted by{' '}
            <i>
              <b>{this.props.postUser}</b>
            </i>
          </small>
          <br />
          <div className="adminPost-postDelete">
            {this.state.deleteConfirmation ? (
              <>
                <i>Are you sure you want to delete this post?</i>
                <br />
                <a href="" className="mainLink" onClick={this.props.deletePost}>
                  Yes
                </a>
                <br />
                <a href="" className="mainLink" onClick={this.cancelDeletion}>
                  No
                </a>
              </>
            ) : (
              <a href="" className="mainLink" onClick={this.confirmDeletion}>
                Delete Post
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPost;

class PostTitleEditor extends Component {
  constructor(props) {
    super(props);
    this.reactQuill = React.createRef();
  }

  modules = {
    toolbar: false
  };

  render() {
    return (
      <ReactQuill
        ref={this.reactQuill}
        id="postTitleQuill"
        modules={this.modules}
        theme="snow"
        defaultValue={this.props.postTitle}
      />
    );
  }
}

class PostBodyEditor extends Component {
  constructor(props) {
    super(props);
    this.reactQuill = React.createRef();
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image'],
      ['clean']
    ]
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'script'
  ];

  // handleEditedText = () => {
  //   var editedText = this.reactQuill.current.editor.getText();
  //   if (editedText == '') {
  //     console.log('no text');
  //   }
  //   this.props.onEditText(editedText);
  // };

  render() {
    return (
      <ReactQuill
        ref={this.reactQuill}
        id="postBodyQuill"
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        defaultValue={this.props.postBody}
        // onChange={(content, delta, source, editor) => {
        //   if (source === 'user') {
        //     this.handleEditedText();
        //   }
        // }}
      />
    );
  }
}

export { PostTitleEditor, PostBodyEditor };
