import React, { Component } from "react";
import { loggedIn } from "./../services/auth-service";

import Container from "react-bootstrap/Container";

import ListRecipe from "../component/ListRecipe";

import * as AuthenticationServices from "./../services/auth-service";

import * as RecipeService from "./../services/recipe-service";

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

    AuthenticationServices.loggedIn()
      .then(user => {
        this.setState({
          user
        });
        // console.log(user);
        RecipeService.addedBy(user._id) //like is a view can have accsess to this.props.match
          .then(recipes => {
            this.setState({
              recipes
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const user = this.state.user;
    return (
      <Container>
        {(!user && (
          <div>
            <h1>Not allowed...</h1>
          </div>
        )) || (
          <div>
            {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
            {/* TODO map through the array of recipes (if it exists) */}
            <h1>Hello, {this.state.user.firstName}</h1>
            <br />
            <p>Below you can find your recipes:</p>
            <ListRecipe recipes={this.state.recipes} {...this.props} />
          </div>
        )}
      </Container>
    );
  }
}
