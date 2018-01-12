import React from 'react';
import {Link} from 'react-router-dom';
import LogIn from './LogIn';
import * as firebase from 'firebase';


class UserPanel extends React.Component {

  constructor() {
    super();

    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true, email: user.email});
      }
    });
  }

  logOut = () => {
    firebase.auth().signOut().then(() => {
      this.setState({isLoggedIn: false, email: null})
    })
      .then(this.props.userLoggedIn())
      .catch(function (error) {
        // An error happened.
      });
  };

  render() {
    return (
      <div>
        {
          this.state.isLoggedIn ?
            <div className="userPanel__content">
              <p className="userPanel__text">Hello {this.state.email}</p>
                <div className="userPanel__logged-list">
                  <button onClick={this.logOut}>Log Out</button>
                  <button><Link to="/favorites">My Favorites</Link></button>
                </div>
            </div> :
            <ul className="userPanel__list">
              <li className="userPanel__list-el"><Link to="/signup">Sign Up</Link></li>
              <LogIn/>
            </ul>
        }
      </div>
    )
  }
}

export default UserPanel;