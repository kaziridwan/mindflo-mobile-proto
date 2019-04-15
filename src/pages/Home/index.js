import React, { Component, Fragment } from "react";
import { GraphQLClient } from 'graphql-request'
import "./style.scss";

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cjuhavbfm4dew0136f5svjec8', {
  headers: {
    Authorization: 'Bearer YOUR_AUTH_TOKEN',
  },
});
class Home extends Component {
  state = {
    videoStatus: 'Pause',
  }

  togglePlayStatus = () => {
    this.setState({videoStatus: this.state.videoStatus === 'Play' ? 'Pause' : 'Play'});
    client.request(`      
      mutation update{
        updateYoutubePlayer(
          id: "cjuibfqka0g0a0146mdnvw3et"
          playing: ${this.state.videoStatus === 'Play' ? 'true' : 'false'}
        ){
          id
          playing
          user{
            id
            name
          }
        }
      }
    `)
  }

  render() {
    return (
      <Fragment>
        <div className="player-controls">
          <input type="button" value={this.state.videoStatus} onClick={this.togglePlayStatus}/>
        </div>
      </Fragment>
    );
  }
}

export default Home;
