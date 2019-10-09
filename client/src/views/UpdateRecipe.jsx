import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class UpdateRecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipeInfo
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      //setState will allow to update the state
      [name]: value
    });
  }

  render() {
    console.log("UPDATE RECIPE PROP", this.props.recipeInfo);
    return (
      <div>
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
