import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { detail } from "./../services/recipe-service";
import * as ConnectingRecipe from "./../services/recipe-service";

export default class UpdateRecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: "",
        ingredients: "",
        preparation: ""
      }
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    detail(this.props.match.params.id)
      .then(recipes => {
        //console.log("RECIPE  DETAILS", recipes);

        this.setState({
          recipe: {
            name: recipes.name,
            ingredients: recipes.ingredients,
            preparation: recipes.preparation
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      recipe: {
        ...this.state.recipe,
        [name]: value
      }
      //setState will allow to update the state
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const id = this.props.match.params.id;
    console.log("id to be submitted", id);

    ConnectingRecipe.editService(id, this.state.recipe)
      .then(recipe => {
        this.props.history.push("/private");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log("UPDATE RECIPE PROP", this.props);
    console.log("ID", this.props.match.params.id);

    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={this.state.recipe.name}
              onChange={this.onValueChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              name="ingredients"
              value={this.state.recipe.ingredients}
              onChange={this.onValueChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Preparation</Form.Label>
            <Form.Control
              name="preparation"
              value={this.state.recipe.preparation}
              onChange={this.onValueChange}
            />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </div>
    );
  }
}
