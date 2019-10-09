import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import * as RecipeService from "./../services/recipe-service";
import { Link } from "react-router-dom";
import UpdateRecipe from "../views/UpdateRecipe";

export default class ListRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      toggle: false
    };
    this.showForm = this.showForm.bind(this);
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
  showForm() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  render() {
    return (
      <div>
        {this.state.recipes.map(recipe => (
          <div>
            <Card key={recipe._addedBy} style={{ width: "18rem" }}>
              <Card.Title>
                <Link to={`/recipedetail/${recipe._id}`}> {recipe.name} </Link>{" "}
              </Card.Title>
              <Button onClick={this.showForm} variant="primary">
                Edit
              </Button>
              {this.state.toggle && <UpdateRecipe recipeInfo={recipe} />}
              <Button variant="danger">Delete</Button>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}
