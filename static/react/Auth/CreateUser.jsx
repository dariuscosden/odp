import React, { Component } from 'react';

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
              <a className="mainLink" href="javascript:history.back()">
                ←
              </a>
              <br />
              <span className="headingOneHalf">Username</span>
              <br />
              <input id="createUserUsername" type="text" />
            </div>
            <div className="adminPost-password">
              <span className="headingOneHalf">Password</span>
              <br />
              <input id="createUserPassword" type="password" />
            </div>
            <center>
              <a href="" className="mainButton" onClick={this.props.createUser}>
                Create User
              </a>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
