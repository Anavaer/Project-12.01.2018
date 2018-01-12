import React from 'react';
import VideoTemp from './VideoTemp';
import * as firebase from "firebase/index";

class FavoriteList extends React.Component {

  constructor() {
    super();

    this.state = {
      favorites: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const favs = [];
    if (nextProps.user) {
      const ref = firebase.database().ref(`users/${nextProps.user.uid}/favorites`);
      ref.once("value")
        .then((snapshot) => {
          if(snapshot.val()) {
            Object.keys(snapshot.val())
              .forEach(key => {
                favs.push(snapshot.val()[key]);
                this.setState({favorites: favs})
              })
          }
        });
    }
  }

  render() {
    const uuidv4 = require('uuid/v4');
    if (!this.state) {
      return (
        <div className="section">
          <p>wait for it</p>
        </div>
      )
    } else if (!this.props.user || !this.state.favorites) {
      return <p>There doesn't seem to be anything here </p>
    } else {
      return (
        <div className="section">
          {this.state.favorites.map(video => {
            return <VideoTemp
              key={uuidv4()}
              videoData={video}
              user={this.props.user}
              isLoggedIn={this.props.isLoggedIn}
            />
          })}
        </div>
      );
    }
  }
}

export default FavoriteList;