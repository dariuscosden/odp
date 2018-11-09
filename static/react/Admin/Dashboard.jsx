import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Logout } from '../Auth/Auth';
import AdminPosts from './AdminPosts';
import AdminPost from './AdminPost';
import { AdminLink } from '../Blog/Links';

// admin dashboard component
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="adminDashboard-flex">
        <div className="adminDashboard-sidebar">
          <a href="/" className="adminDashboard-logo">
            ODP
          </a>
          <AdminLink to="/admin/posts">
            <i className="fas fa-edit" />
            Blog Manager
          </AdminLink>
          <AdminLink to="/admin/users">
            <i className="fas fa-user-edit" />
            User Area
          </AdminLink>
          <AdminLink exact to="/">
            Back
          </AdminLink>
          <Logout onLogout={this.props.onLogout} />
        </div>
        <div className="adminDashboard-content">
          <div className="adminDashboardHeader-flex">
            <div className="adminDashboardHeader-header">
              <span className="headingThree bold">Manage your blog</span>
            </div>
            <div className="adminDashboardHeader-menuFlex">
              <div className="adminDashboardHeader-menuItem">
                {this.props.publish ? (
                  <a href="/admin" className="accentColor">
                    Publish website
                  </a>
                ) : (
                  <span className="noselect">
                    <i>Website published</i>
                  </span>
                )}
              </div>
            </div>
          </div>
          <hr />
          <AdminPosts
            posts={this.props.posts}
            searchPosts={this.props.searchPosts}
            nextPage={this.props.nextPage}
            previousPage={this.props.previousPage}
            getPrevPage={this.props.getPrevPage}
            getNextPage={this.props.getNextPage}
            createPost={this.props.createPost}
            updatePost={this.props.updatePost}
            deletePost={this.props.deletePost}
          />
          {this.props.message.type == 'success' ? (
            <div className="adminMessageSuccess">
              {this.props.message.content}
            </div>
          ) : null}
          {this.props.message.type == 'error' ? (
            <div className="adminMessageError">
              {this.props.message.content}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Dashboard;
