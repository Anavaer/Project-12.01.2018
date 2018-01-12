import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import FavoriteList from './FavoriteList';
import * as firebase from "firebase/index";


class Favorites extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: null,
    }
  }

  userLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true, user: user});
      } else {
        this.setState({isLoggedIn: false, user: null});
      }
    });
  };

  componentWillReceiveProps() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({user: user});
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({user: user});
    });
  }

  render() {
    return (
      <div className="content">
        <Header
          userLoggedIn={this.userLoggedIn}
          search={this.searchForVids}
        />
        <div className="main">
          <div className="container">
            <Nav/>
            <FavoriteList
              user={this.state.user}
              isLoggedIn={this.state.isLoggedIn}
            />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Favorites;