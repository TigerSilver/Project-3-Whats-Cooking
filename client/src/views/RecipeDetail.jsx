import React, { Component } from "react";

import * as RecipeService from "./../services/recipe-service";

import { Link } from "react-router-dom";

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
        <h1>RECIPE DETAIL</h1>
        {this.state.recipe && (
          <Card key={this.state.recipe._id} style={{ width: "18rem" }}>
            <Card.Title> {this.state.recipe.name} </Card.Title>
            <Card.Text>{this.state.recipe.ingredients}</Card.Text>
            <Card.Text>{this.state.recipe.preparation}</Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card>
        )}
      </div>
    );
  }
}
