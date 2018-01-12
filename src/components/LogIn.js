import React from 'react';
import * as firebase from 'firebase';


class LogIn extends React.Component {

  logIn = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.login.value, this.pass.value)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
      });
  };

  render() {
    return (
      <li className="userPanel__list-el"><span>Log In</span>
        <div className="userPanel__logIn">
          <form onSubmit={this.logIn} className="userPanel__form">
            <label htmlFor="login">Email</label>
            <input className="userPanel__form__input" ref={input => this.login = input} type="text" name="login"
                   id="login"/>
            <label htmlFor="password">Password</label>
            <input className="userPanel__form__input" ref={input => this.pass = input} type="password" name="password"
                   id="password"/>
            <button className="btn" type="submit">Log In</button>
          </form>
        </div>
      </li>
    );
  }
}

export default LogIn;