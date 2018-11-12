import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidebarPost extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sidebarPost">
        <Link className="colorlessLink" to={'/' + this.props.postSlug}>
          <img src={this.props.postImage} />
        </Link>
        <br />
        <Link className="colorlessLink" to={'/' + this.props.postSlug}>
          <b>{this.props.postTitle}</b>
        </Link>
      </div>
    );
  }
}

export default SidebarPost;
