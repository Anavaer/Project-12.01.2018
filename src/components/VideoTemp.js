import React from 'react';
import CommentList from './CommentList';
import * as firebase from 'firebase';

class VideoTemp extends React.Component {

  constructor() {
    super();
    this.state = {
      showVideo: false,
    }
  }

  showVideo = () => {
    this.setState({showVideo: !this.state.showVideo});
  };

  addsToFavorites = () => {
    const {channelId, channel, title, desc, thumbnails, date, id} = this.props.videoData;
    const favoritesListRef = firebase.database().ref(`users/${this.props.user.uid}/favorites`);
    const newFavRef = favoritesListRef.push();
    newFavRef.set({
      'channelId': channelId,
      'channel': channel,
      'title': title,
      'desc': desc,
      'thumbnails': thumbnails,
      'date': date,
      'id': id
    });
  };

  getComments = (e) => {
    e.preventDefault();
    const date = new Date();
    const dateStr = date.toDateString();
    const comment = {};

    const messageListRef = firebase.database().ref('comments/' + this.props.videoData.id);
    const newMessageRef = messageListRef.push();
    if (this.props.user) {
      newMessageRef.set({
        'email': this.props.user.email,
        'comment': this.text.value,
        'date': dateStr
      });
    } else {
      newMessageRef.set({
        'email': 'Guest',
        'comment': this.text.value,
        'date': dateStr
      });
    }

    this.setState({comment: comment})
  };

  render() {
    return (
      <div className={this.state.showVideo ? "section__video__container" : ''}>
        {this.state.showVideo ?
          <div className="section__video--active">
            <div className="section__video__column">
              <div className="section__video__wrapper">
                <iframe
                  src={`http://www.youtube.com/embed/${this.props.videoData.id}?autoplay=1&fs=0`}
                  title={`youtube video titled ${this.props.title}`}
                  className="section__video__iframe"

                ></iframe>
              </div>
              <form onSubmit={this.getComments}>
                <textarea ref={text => this.text = text} name="comment" id="comment"
                          className="section__video__textarea"></textarea>
                <button type="submit" className="btn">Submit</button>
                {this.props.isLoggedIn &&
                <button type="button" className="btn" onClick={this.addsToFavorites}>Add to Favorites</button>}
              </form>
            </div>
            <button onClick={this.showVideo} className="btn--float btn"> X</button>
            <CommentList
              comment={this.state.comment}
              videoId={this.props.videoData.id}
            />
          </div>
          :
          <div className="section__video">
            <div>
              <img
                className="section__thumbnail"
                src={this.props.videoData.thumbnails}
                alt={`youtube video titled ${this.props.videoData.title}`}
                onClick={this.showVideo}
              />
              <p className="section__title">{this.props.videoData.title}</p>
            </div>
            <a className=" btn section__title btn--float"
               href={'https://www.youtube.com/channel/' + this.props.videoData.channelId}>{this.props.videoData.channel}</a>
          </div>
        }
      </div>
    );
  }
}

export default VideoTemp;