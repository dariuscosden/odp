import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import CreateUser from './CreateUser';
import AdminUser from './AdminUser';

class AdminUsers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        <Route
          path="/admin/users/create"
          render={() => <CreateUser createUser={this.props.createUser} />}
        />
        <Route
          path="/admin/users/:userID"
          render={props => {
            const users = JSON.parse(this.props.users);
            const user = users.find(u => u.id == props.match.params.userID);
            if (!user) {
              return null;
            }
            return (
              <AdminUser
                {...props}
                userID={user.id}
                username={user.username}
                userCategory={user.category}
                updateUser={this.props.updateUser}
                deleteUser={this.props.deleteUser}
              />
            );
          }}
        />
        <Route
          path="/admin/users"
          render={() => (
            <AdminUserList
              users={this.props.users}
              usersPreviousPage={this.props.usersPreviousPage}
              usersNextPage={this.props.usersNextPage}
            />
          )}
        />
      </Switch>
    );
  }
}

export default AdminUsers;

class AdminUserList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const users = JSON.parse(this.props.users).map(user => (
      <li key={user.id}>
        <Link to={'/admin/users/' + user.id}>{user.username}</Link>
      </li>
    ));
    return (
      <div className="adminUsers-container">
        <div className="adminUsers-headerFlex">
          <div className="adminUsers-header">
            <span className="headingTwo bold">Users</span>
          </div>
        </div>
        <div className="adminUsers-postsFlex">
          <div className="adminUsers-posts">
            <ul className="adminUsers-postList">{users}</ul>
          </div>
          <div className="adminUsers-postsMenu">
            <Link to="/admin/users/create" className="mainLink">
              Create User
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
