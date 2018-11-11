import React, { Component } from 'react';
import ReactQuill, { EditorState } from 'react-quill';

class AdminUser extends Component {
  constructor(props) {
    super(props);
    this.usernameEditor = React.createRef();
    this.categoryEditor = React.createRef();
    this.state = {
      deleteConfirmation: false,
      username: this.props.username,
      userCategory: this.props.userCategory
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

  updateUsername = () => {
    const username = this.usernameEditor.current.reactQuill.current.editor.getText();
    this.setState({ username: username });
  };

  updateCategory = () => {
    const userCategory = this.categoryEditor.current.reactQuill.current.editor.getText();
    this.setState({ userCategory: userCategory });
  };

  render() {
    return (
      <>
        <div className="adminPost-topPostInfo">
          <div className="adminPost-topPostInfo-left">
            <a href="javascript:history.back()">Go Back</a>
          </div>
          <div className="adminPost-topPostInfo-right">
            <small>
              User id
              {': '}
              <i>
                <b id="userID">{this.props.userID}</b>
              </i>
            </small>
            <br />
            <small>
              Username
              {': '}
              <i>
                <b>{this.state.username}</b>
              </i>
            </small>
            <br />
            <small>
              Category
              {': '}
              <i>
                <b>{this.state.userCategory}</b>
              </i>
            </small>
            <br />
            <div className="adminPost-postDelete">
              {this.state.deleteConfirmation ? (
                <>
                  <i>
                    Deleting this user will also delete all of their posts.
                    Continue?
                  </i>
                  <br />
                  <a
                    href=""
                    className="mainLink"
                    onClick={this.props.deleteUser}
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
                  Delete User
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="adminPost-flex">
          <div className="adminPost-postEdit">
            <div className="adminPost-header">
              <div className="adminPost-title">
                <span className="headingOneHalf">Username</span>
                <UsernameEditor
                  ref={this.usernameEditor}
                  username={this.props.username}
                  onEditText={this.updateUsername}
                  enableEdits={true}
                />
              </div>
              <center>
                <a
                  href=""
                  className="mainButton"
                  onClick={this.props.updateUser}
                >
                  Save Changes
                </a>
              </center>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminUser;

// changes <p> to <div>
const Quill = ReactQuill.Quill;
var Block = Quill.import('blots/block');
Block.tagName = 'div';
Quill.register(Block);

class UsernameEditor extends Component {
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
        id="usernameQuill"
        modules={this.modules}
        theme="snow"
        defaultValue={this.props.username}
        onChange={(content, delta, source, editor) => {
          if (this.props.enableEdits) {
            this.handleEditedText();
          }
        }}
      />
    );
  }
}

class UserPasswordEditor extends Component {
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
        id="userPasswordQuill"
        modules={this.modules}
        theme="snow"
      />
    );
  }
}

class UserEmailEditor extends Component {
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
        id="userEmailQuill"
        modules={this.modules}
        theme="snow"
      />
    );
  }
}

class UserCategoryEditor extends Component {
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
        id="userCategoryQuill"
        modules={this.modules}
        theme="snow"
        defaultValue={this.props.userCategory}
        onChange={(content, delta, source, editor) => {
          if (this.props.enableEdits) {
            this.handleEditedText();
          }
        }}
      />
    );
  }
}

export {
  UsernameEditor,
  UserCategoryEditor,
  UserPasswordEditor,
  UserEmailEditor
};
