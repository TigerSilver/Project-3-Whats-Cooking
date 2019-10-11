import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

// import * as RecipeService from "./../services/recipe-service";
import { Link } from "react-router-dom";

import * as RecipeService from "./../services/recipe-service";

export default class ListRecipe extends Component {
  constructor(props) {
    super(props);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  render() {
    return (
      <div>
        {this.props.recipes.map(recipe => (
          <div key={recipe._id}>
            <Card key={recipe._addedBy} style={{ width: "18rem" }}>
              {" "}
              {/* <Button onClick={this.showForm} variant="primary">
                Edit
              </Button>
              {this.state.toggle && <UpdateRecipe recipeInfo={recipe} />} */}
            </Card>
          </div>
        ))}
      </div>
    );
  }
}
