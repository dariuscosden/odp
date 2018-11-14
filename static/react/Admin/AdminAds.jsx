import React, { Component } from 'react';

class AdminAds extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const ads = JSON.parse(this.props.ads);
    return (
      <div className="adminAds-flex">
        <div className="adminPost-postEdit">
          <div className="adminPost-header">
            <span className="headingOneHalf">Sidebar Ad</span>
            <br />
            {ads.map(ad => {
              if (ad.type === 'sidebar') {
                return <SidebarFeedAd key={ad.id} adContent={ad.content} />;
              }
            })}
            <br />
            <span className="headingOneHalf">Feed Ad</span>
            <br />
            {ads.map(ad => {
              if (ad.type === 'feed') {
                return <AdminFeedAd key={ad.id} adContent={ad.content} />;
              }
            })}
            <br />
            <a href="" className="mainButton" onClick={this.props.updateAds}>
              Update Ads
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminAds;

class AdminFeedAd extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <textarea
        id="feedAdTextArea"
        className="textarea"
        defaultValue={this.props.adContent}
      />
    );
  }
}

class SidebarFeedAd extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <textarea
        id="sidebarAdTextArea"
        className="textarea"
        defaultValue={this.props.adContent}
      />
    );
  }
}
