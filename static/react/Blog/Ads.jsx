import React, { Component } from 'react';

class FeedAd extends Component {
  constructor(props) {
    super(props);
  }

  getAdContentHTML = () => {
    return { __html: this.props.adContent };
  };

  render() {
    return (
      <div
        className="feedAd"
        dangerouslySetInnerHTML={this.getAdContentHTML()}
      />
    );
  }
}

export default FeedAd;

class PostAd extends Component {
  constructor(props) {
    super(props);
  }

  getAdContentHTML = () => {
    return { __html: this.props.adContent };
  };

  render() {
    return (
      <div
        className="postFeedAd"
        dangerouslySetInnerHTML={this.getAdContentHTML()}
      />
    );
  }
}

export { PostAd };
