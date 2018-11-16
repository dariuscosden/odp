import React, { Component } from 'react';
import ReactQuill, { EditorState } from 'react-quill';
import FeedPost from '../Blog/Feed/FeedPost';

const axios = require('axios');

class AdminPost extends React.Component {
  constructor(props) {
    super(props);
    this.postImageEditor = React.createRef();
    this.postTitleEditor = React.createRef();
    this.postBodyEditor = React.createRef();
    this.postCategoryEditor = React.createRef();
    this.state = {
      deleteConfirmation: false,
      postImage: this.props.postImage,
      postTitle: this.props.postTitle,
      postBody: this.props.postBody,
      postCategory: this.props.postCategory
    };
  }

  confirmDeletion = e => {
    e.preventDefault();
    this.setState({ deleteConfirmation: true });
  };

  cancelDeletion = e => {
    e.preventDefault();
    this.setState({ deleteConfirmation: false });
  };

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
          <div className="adminPost-topPostInfo-right">
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
              by{' '}
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
                  <a
                    href=""
                    className="mainLink"
                    onClick={this.props.deletePost}
                  >
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
                  onClick={this.props.updatePost}
                >
                  Save Changes
                </a>
              </center>
            </div>
          </div>
          <div className="adminPost-postDetails">
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

export default AdminPost;

// changes <p> to <div>
const Quill = ReactQuill.Quill;
var Block = Quill.import('blots/block');
Block.tagName = 'div';
Quill.register(Block);
let BlockEmbed = Quill.import('blots/block/embed');

// creates the video blot
class VideoBlot extends BlockEmbed {
  static create(url) {
    let node = super.create();
    node.setAttribute('src', url);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    return node;
  }

  static formats(node) {
    let format = {};
    if (node.hasAttribute('height')) {
      format.height = node.getAttribute('height');
    }
    if (node.hasAttribute('width')) {
      format.width = node.getAttribute('width');
    }
    return format;
  }

  static value(node) {
    return node.getAttribute('src');
  }

  format(name, value) {
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'iframe';

Quill.register(VideoBlot);

class LinkBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('href', value);
    return node;
  }

  static formats(node) {
    return node.getAttribute('href');
  }
}
LinkBlot.blotName = 'fancylink';
LinkBlot.tagName = 'a';

Quill.register(LinkBlot);

class PostTitleEditor extends Component {
  constructor(props) {
    super(props);
    this.reactQuill = React.createRef();
  }

  modules = {
    toolbar: false
  };

  handleEditedText = () => {
    if (this.reactQuill.current) {
      var editedText = this.reactQuill.current.editor.getText();
      if (editedText == '') {
        console.log('no text');
      }
      this.props.onEditText(editedText);
    }
  };

  render() {
    return (
      <ReactQuill
        ref={this.reactQuill}
        id="postTitleQuill"
        modules={this.modules}
        theme="snow"
        defaultValue={this.props.postTitle}
        onChange={(content, delta, source, editor) => {
          this.handleEditedText();
        }}
      />
    );
  }
}

class PostBodyEditor extends Component {
  constructor(props) {
    super(props);
    this.reactQuill = React.createRef();
  }

  // handles image upload in rich rext editor
  imageHandler() {
    let quill = this.reactQuill.current.editor;
    let fileInput = quill.container.querySelector('input.ql-image[type=file]');

    if (fileInput == null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute(
        'accept',
        'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
      );
      fileInput.classList.add('ql-image');
      fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        const range = quill.getSelection(true);

        if (!files || !files.length) {
          console.log('No files selected');
          return;
        }

        const formData = new FormData();
        formData.append('file', files[0]);

        quill.enable(false);

        axios
          .post('/adminPost', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            responsetype: 'json'
          })
          .then(response => {
            quill.enable(true);
            quill.insertEmbed(range.index, 'image', response.data.fileURL);
            quill.setSelection(range.index + 1);
            fileInput.value = '';
          })
          .catch(error => {
            console.log('quill image upload failed');
            console.log(error);
            quill.enable(true);
          });
      });
    }
    fileInput.click();
  }

  // handles image upload in rich rext editor
  videoHandler() {
    let quill = this.reactQuill.current.editor;
    let range = quill.getSelection(true);

    var videoInputDiv = document.getElementById('videoInputDiv');

    var videoURLInput = document.createElement('input');
    videoURLInput.type = 'text';
    videoURLInput.value =
      '<div class="facebookContainer">--IFRAME HTML HERE--</div>';

    var videoURLInputSubmit = document.createElement('input');
    videoURLInputSubmit.type = 'submit';

    videoInputDiv.appendChild(videoURLInput);
    videoInputDiv.appendChild(videoURLInputSubmit);

    videoURLInputSubmit.onclick = function() {
      var videoURL = videoURLInput.value;
      // quill.insertEmbed(range.index + 1, 'video', videoURL, Quill.sources.USER);
      // quill.insertEmbed(range.index, 'fancylink', videoURL, Quill.sources.USER);
      quill.clipboard.dangerouslyPasteHTML(range.index, videoURL);
      quill.setSelection(range.index + 1, Quill.sources.SILENT);

      videoInputDiv.innerHTML = '';
    };
  }

  modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ align: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' }
        ],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: this.imageHandler.bind(this),
        video: this.videoHandler.bind(this)
      }
    }
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
    'video',
    'image',
    'align',
    'script'
  ];

  handleEditedText = () => {
    if (this.reactQuill.current) {
      var editedText = this.reactQuill.current.editor.getText();
      if (editedText == '') {
        console.log('no text');
      }
      this.props.onEditText(editedText);
    }
  };

  render() {
    return (
      <>
        <div id="videoInputDiv" className="ql-tooltip ql-editing" />
        <ReactQuill
          ref={this.reactQuill}
          id="postBodyQuill"
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          defaultValue={this.props.postBody}
          imageHandler={this.imageHandler}
          onChange={(content, delta, source, editor) => {
            this.handleEditedText();
          }}
        />
      </>
    );
  }
}

class PostCategoryEditor extends Component {
  constructor(props) {
    super(props);
    this.reactQuill = React.createRef();
  }

  modules = {
    toolbar: false
  };

  handleEditedText = () => {
    if (this.reactQuill.current) {
      var editedText = this.reactQuill.current.editor.getText();
      if (editedText == '') {
        console.log('no text');
      }
      this.props.onEditText(editedText);
    }
  };

  render() {
    return (
      <ReactQuill
        ref={this.reactQuill}
        id="postCategoryQuill"
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        defaultValue={this.props.postCategory}
        onChange={(content, delta, source, editor) => {
          this.handleEditedText();
        }}
      />
    );
  }
}

class PostImageEditor extends Component {
  constructor(props) {
    super(props);
    this.reactQuill = React.createRef();
  }

  modules = {
    toolbar: {
      container: ['image'],
      handlers: {
        image: this.imageHandler.bind(this)
      }
    }
  };

  // handles image upload in rich rext editor
  imageHandler() {
    let quill = this.reactQuill.current.editor;
    let fileInput = quill.container.querySelector('input.ql-image[type=file]');

    if (fileInput == null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute(
        'accept',
        'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
      );
      fileInput.classList.add('ql-image');
      fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        const range = quill.getSelection(true);

        if (!files || !files.length) {
          console.log('No files selected');
          return;
        }

        const formData = new FormData();
        formData.append('file', files[0]);

        quill.enable(false);

        axios
          .post('/adminPost', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            responsetype: 'json'
          })
          .then(response => {
            quill.enable(true);
            quill.setContents('');
            quill.insertText(0, response.data.fileURL);
            quill.setSelection(0);
            fileInput.value = '';
          })
          .catch(error => {
            console.log('quill image upload failed');
            console.log(error);
            quill.enable(true);
          });
      });
    } else {
      console.log('else');
    }
    fileInput.click();
  }

  handleEditedText = () => {
    if (this.reactQuill.current) {
      var editedText = this.reactQuill.current.editor.getText();
      if (editedText == '') {
        console.log('no text');
      }
      this.props.onEditText(editedText);
    }
  };

  render() {
    return (
      <ReactQuill
        ref={this.reactQuill}
        id="postImageQuill"
        theme="snow"
        modules={this.modules}
        defaultValue={this.props.postImage}
        onChange={(content, delta, source, editor) => {
          this.handleEditedText();
        }}
      />
    );
  }
}

export { PostTitleEditor, PostBodyEditor, PostCategoryEditor, PostImageEditor };
