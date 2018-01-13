import React from 'react';
import {render} from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom'

import './App.css';
import App from './components/App';
import SignUp from './components/SignUp';
import Favorites from "./components/Favorites";

import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';


const config = {
  apiKey: "AIzaSyB12xPkUjugeG3guk38Rxe20qdJGwGB7Nc",
  authDomain: "codejs-kkowalski.firebaseapp.com",
  databaseURL: "https://codejs-kkowalski.firebaseio.com",
  projectId: "codejs-kkowalski",
  storageBucket: "codejs-kkowalski.appspot.com",
  messagingSenderId: "1008800290753"
};

firebase.initializeApp(config);
const repo = `/${window.location.pathname.split('/')[1]}`;


render(
  <div>
    <HashRouter basename={repo}>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/category/:category" component={App}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/favorites" component={Favorites}/>
      </Switch>
    </HashRouter>
  </div>,
  document.getElementById('root')
);
registerServiceWorker();
