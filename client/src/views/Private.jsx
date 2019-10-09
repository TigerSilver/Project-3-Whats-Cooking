import React, { Component } from "react";
import { loggedIn } from "./../services/auth-service";

import { Link } from "react-router-dom";
// import { listRecipes } from "../services/recipe-service";
// import Card from "react-bootstrap/Card";

import ListRecipe from "../component/ListRecipe";

export default class PrivateView extends Component {
  constructor(props) {
    super(props);
    //methods need to be bind in order to work
    this.state = {
      user: "",
      // TODO create an array of user recipes
      recipes: []
    };
  }

  componentDidMount() {
    loggedIn()
      .then(user => {
        console.log(user);
        this.setState({
          user: user
        });
      })
      .catch(error => {
        console.log(error);
      });

    //TODO : find all recipes with the list recipe service
    // listOfRecipes();
    //TODO : flter user recipes

    //TODO : Save an arrray of user recipes in the state
  }

  render() {
    return (
      <div>
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        {/* TODO map through the array of recipes (if it exists) */}
        <Link to="/home">Home</Link>
        <h1>Hellooooo private</h1>
        <ListRecipe />
      </div>
    );
  }
}
