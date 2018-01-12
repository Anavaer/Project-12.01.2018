import React from 'react';
import * as firebase from 'firebase';

class CommentList extends React.Component {

  constructor() {
    super();

    this.state = {
    }
  }

  componentWillReceiveProps() {
    const ref = firebase.database().ref("comments/" + this.props.videoId);
    ref.once("value")
      .then((snapshot) => {
        this.setState({comments: snapshot.val()});
      });
  }

  componentDidMount() {
    const ref = firebase.database().ref("comments/" + this.props.videoId);
    ref.once("value")
      .then((snapshot) => {
        this.setState({comments: snapshot.val()});
      });
  }

  render() {
    if (this.state.comments) {
      const comments = [];
      for (const key in this.state.comments) {
        comments.push(this.state.comments[key])
      }
      return (
        <div className="section__video__comments">
          {
            comments.map((comment, index) => {
              return (
                <div className="section__video__commentList" key={index}>
                  <p><span>{comment.date}</span></p>
                  <p><span>{comment.email} said: </span></p>
                  <p>{comment.comment}</p>
                </div>
              )
            })
          }
        </div>
      );
    } else {
      return (
        <div className="section__video__comments">
          <div className="section__video__commentList">
          <p>Feel free to leave a comment :)</p>
          </div>
        </div>
      )
    }

  }
}

export default CommentList;