import React, { Component } from "react";

import { listRecipes } from "./../services/recipe-service";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import * as AuthenticationServices from "./../services/auth-service";

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    // methods need to be bind in order to work
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      recipes: [],
      user: null
    };
  }

  handleClick() {
    AuthenticationServices.logOutService()
      .then(user => {
        this.props.history.push("/");
        // console.log(user);
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }

  componentDidMount() {
    listRecipes()
      .then(recipes => {
        this.setState({
          recipes
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
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const user = this.state.user;
    return (
      (!user && (
        <div>
          <h1>Not allowed...</h1>
        </div>
      )) || (
        <div>
          <Link to="/private">Profile</Link>
          <div>
            <Link to="/addRecipe">+</Link>
          </div>
          <h1>Home</h1>
          <p>Here are presented all the published recipes.</p>

          {this.state.recipes.map(recipes => (
            <Card key={recipes._id}>
              <Card.Body>
                <Card.Title>{recipes.name}</Card.Title>
                <Card.Text>{recipes.ingredients}</Card.Text>
                <Card.Text>{recipes.preparation}</Card.Text>
                <Card.Text>{recipes.meal}</Card.Text>
                <Card.Text>{recipes.typeOfFood}</Card.Text>
                <Card.Text>{recipes.specifications}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          <Button onClick={this.handleClick}>Log out</Button>
        </div>
      )
    );
  }
}
