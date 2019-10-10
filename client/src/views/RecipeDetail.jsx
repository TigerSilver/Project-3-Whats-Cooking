import React, { Component, Fragment } from "react";

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
        {this.state.recipe && (
          <Fragment>
            <div className="py-5 bg-primary">
              <Container>
                <h1>{this.state.recipe.name}</h1>
              </Container>
            </div>
            <Container>
              <img src={this.state.recipe.image} />
              <Card.Title>
                <strong>Name:</strong>
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
          </Fragment>
        )}
      </div>
    );
  }
}
