import React, {Component} from 'react';
import '../App.css';
import Nav from "./Nav";
import Section from "./Section";
import Header from "./Header";
import Footer from "./Footer";
import * as firebase from 'firebase';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user:null,
      category: this.props.match.params.category,
    }
  }

  searchForVids = (e, search) => {
    e.preventDefault();
    this.setState({search: search.value});
    this.setState({category: ''});
  };

  componentWillReceiveProps(nextProps) {
    this.setState({category: nextProps.match.params.category})
  }

  userLoggedIn = () => {
    console.log('asdasd');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true, user: user});
      } else {
        this.setState({isLoggedIn: false, user: null});
      }
    });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true, user: user});
      }
    });
  }

  render() {
    return (
      <div className="content">
        <Header
          userLoggedIn={this.userLoggedIn && this.userLoggedIn}
          search={this.searchForVids}
        />
        <div className="main">
          <div className="container-rwd">
            <Nav/>
            <Section
              category={this.state.category}
              isLoggedIn={this.state.isLoggedIn}
              user={this.state.user}
              search={this.state.search}
            />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
