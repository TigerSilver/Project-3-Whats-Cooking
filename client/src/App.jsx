import React, { Component } from "react";

import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PlaneView from "./views/Plane";
import SignInView from "./views/SignIn";
import SignUpView from "./views/SignUp";
import HomeView from "./views/Home";
// import ErrorView from "./views/Error";
// import CatchAllView from "./views/CatchAll";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={PlaneView} />
            <Route path="/signin" component={SignInView} />
            <Route path="/signup" component={SignUpView} />
            <Route path="/home" component={HomeView} />
            {/* <Route path="/error/:code" component={ErrorView} />
            <Route path="/" component={CatchAllView} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}
