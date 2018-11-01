import React, { Component } from 'react';

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>{this.props.postSlug}</h1>;
  }
}

export default Post;
