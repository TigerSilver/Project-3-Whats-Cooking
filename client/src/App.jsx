import React, { Component } from "react";

import "./App.css";

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

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={LandingView} />
            <Route path="/login" component={SignInView} />
            <Route path="/signup" component={SignUpView} />
            <Route path="/home" component={HomeView} />
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
