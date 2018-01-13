import React from 'react';
import Nav from './Nav';
import * as firebase from 'firebase';
import Header from "./Header";
import Footer from "./Footer";

class SignUp extends React.Component {

  constructor() {
    super();
    this.state = {
      passMatch: true
    }
  }

  checkSignUp = (e) => {
    e.preventDefault();

    if (this.pass1.value === this.pass2.value) {
      firebase.auth().createUserWithEmailAndPassword(this.login.value, this.pass2.value)
        .then(user => {
          if (user != null) {
            firebase.database().ref('users/' + user.uid).set({
              email: user.email,
            });
          }
        })
        .catch(function (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    } else {
      this.setState({passMatch: false})
    }

    this.form.reset();
  };

  render() {
    const error = {
      color: 'red',
      fontSize: '25px'
    };
    return (
      <div className="content">
        <Header/>
        <div className="main">
          <div className="container">
            <Nav/>
            <div className="section section--bordered">
              <form ref={form => this.form = form} className="signUp-form" onSubmit={this.checkSignUp}>
                <label htmlFor="login">Email</label>
                <input ref={input => this.login = input} type="text" name="login" id="login"/>
                <label htmlFor="password">Password</label>
                {!this.state.passMatch && <p style={error}>Passwords must match!</p>}
                <input ref={input => this.pass1 = input} type="password" name="password" id="password"/>
                <label htmlFor="password">Confirm password</label>
                {!this.state.passMatch && <p style={error}>Passwords must match!</p>}
                <input ref={input => this.pass2 = input} type="password" name="password" id="password"/>
                <button type="submit" className="btn">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default SignUp;