import React, { Component } from 'react';
import {
  UserCategoryEditor,
  UsernameEditor,
  UserPasswordEditor,
  UserEmailEditor
} from './AdminUser';

class CreateUser extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="adminPost-flex">
        <div className="adminPost-postEdit">
          <div className="adminPost-header">
            <div className="adminPost-title">
              <a href="javascript:history.back()">Go Back</a>
              <br />
              <span className="headingOneHalf">Username</span>
              <UsernameEditor />
            </div>
            <div className="adminPost-password">
              <span className="headingOneHalf">Password</span>
              <UserPasswordEditor />
            </div>
            <center>
              <a href="" className="mainButton" onClick={this.props.createUser}>
                Save Changes
              </a>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
