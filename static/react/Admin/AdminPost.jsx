import React, { Component } from 'react';
import ReactQuill, { EditorState } from 'react-quill';

class AdminPost extends React.Component {
  constructor(props) {
    super(props);
  }

  updatePost = e => {
    e.preventDefault();
    console.log(e.target);
  };

  render() {
    return (
      <div className="adminPost-flex">
        <div className="adminPost-postInfo">
          <div className="adminPost-header">
            <span className="headingTwo accentColor bold">
              {this.props.postTitle}
            </span>
            <br />
            <small>
              <i>{this.props.postDateCreated}</i>
            </small>
            <br />
            <small>
              Posted by{' '}
              <i>
                <b>{this.props.postUser}</b>
              </i>
            </small>
          </div>
          <div id="adminPost-body" className="adminPost-body">
            <RichTextEditor postBody={this.props.postBody} />
          </div>
          <a href="" className="mainButton" onClick={this.updatePost}>
            Save Changes
          </a>
        </div>
      </div>
    );
  }
}

export default AdminPost;

class RichTextEditor extends Component {
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

  componentDidMount = () => {
    console.log(this.reactQuill.current.editor.getText());
  };

  render() {
    return (
      <div className="text-editor">
        <ReactQuill
          ref={this.reactQuill}
          id="testing"
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          defaultValue={this.props.postBody}
        />
      </div>
    );
  }
}
