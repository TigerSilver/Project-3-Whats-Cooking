import React, { Component } from "react";

import * as RecipeService from "./../services/recipe-service";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
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
        <h1>RECIPE DETAIL</h1>
        {this.state.recipe && (
          <Card key={this.state.recipe._id} style={{ width: "18rem" }}>
            <Card.Title> {this.state.recipe.name} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Button variant="primary">Go somewhere</Button>
          </Card>
        )}
      </div>
    );
  }
}
