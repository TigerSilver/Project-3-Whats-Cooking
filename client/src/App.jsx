import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingView from "./views/LandingPage";
import SignInView from "./views/SignIn";
import SignUpView from "./views/SignUp";
import HomeView from "./views/Home";
import addRecipeView from "./views/AddRecipe";
import PrivateView from "./views/Private";
import DetailView from "./views/RecipeDetail";
import UpdateRecipeView from "./views/UpdateRecipe";
// import ErrorView from "./views/Error";
// import CatchAllView from "./views/CatchAll";

import AppNavbar from "./component/AppNavbar";

import * as AuthenticationServices from "./services/auth-service";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    AuthenticationServices.loggedIn()
      .then(user => {
        this.setState({
          user
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setUser(user) {
    this.setState({
      user
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <AppNavbar user={this.state.user} setUser={this.setUser} />
          <Switch>
            <Route path="/" exact component={LandingView} />
            <Route
              path="/login"
              render={props => <SignInView setUser={this.setUser} {...props} />}
            />
            <Route
              path="/signup"
              render={props => <SignUpView setUser={this.setUser} {...props} />}
            />
            {/* <Route path="/home" component={HomeView} /> */}
            <Route
              path="/home"
              render={props => <HomeView user={this.state.user} {...props} />}
            />
            <Route path="/addRecipe" component={addRecipeView} />
            <Route path="/private" component={PrivateView} />
            <Route path="/recipeDetail/:id" component={DetailView} />
            <Route path="/edit/:id" component={UpdateRecipeView} />

            {/* <Route path="/error/:code" component={ErrorView} />
            <Route path="/" component={CatchAllView} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}
