import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import * as RecipeService from "./../services/recipe-service";
import { Link } from "react-router-dom";

export default class ListRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    RecipeService.listRecipes()
      .then(recipes => {
        this.setState({
          recipes
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.recipes.map(recipe => (
          <Link to={`/recipedetail/${recipe._id}`}>
            <Card key={recipe._addedBy} style={{ width: "18rem" }}>
              <Card.Title> {recipe.name} </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Button variant="primary">Go somewhere</Button>
            </Card>
          </Link>
        ))}
      </div>
    );
  }
}
