import React, { Component } from "react";

import * as RecipeService from "./../services/recipe-service";

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null
    };
    this.loadRecipe = this.loadRecipe.bind(this);
  }

  loadRecipe() {
    RecipeService.detail(this.props.match.params.id)
      .then(recipe => {
        this.setState({
          recipe
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadRecipe();
  }

  render() {
    return (
      <div>
        <Link to="/home"> Home </Link>
        <h1>Recipe Details</h1>
        {this.state.recipe && (
          <Container>
            <Card.Title>
              <strong>Name:</strong> {this.state.recipe.name}
            </Card.Title>
            <Card.Text>
              <strong>Ingredients:</strong> {this.state.recipe.ingredients}
            </Card.Text>
            <Card.Text>
              <strong>Preparation:</strong> {this.state.recipe.preparation}
            </Card.Text>
            <Card.Text>
              <strong>Meal:</strong> {this.state.recipe.meal}
            </Card.Text>
            <Card.Text>
              <strong>Specifications:</strong>{" "}
              {this.state.recipe.specifications}
            </Card.Text>
            <Card.Text>
              <strong>Type of food:</strong> {this.state.recipe.typeOfFood}
            </Card.Text>
          </Container>
        )}
      </div>
    );
  }
}
