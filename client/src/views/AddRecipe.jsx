import React, { Component } from "react";

import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import * as ConnectingRecipe from "./../services/recipe-service";
import * as AuthenticationServices from "./../services/auth-service";
import Button from "react-bootstrap/Button";

export default class addRecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingredients: "",
      preparation: "",
      //image: "",
      // meal: ["Breakfast", "Lunch", "Dinner", "Beverage", "Dessert"],
      meal: "",
      // typeOfFood: ["Vegetarian", "Vegan", "Raw", "Fish", "Meat"],
      typeOfFood: "",
      specifications: [
        "Gluten-free",
        "Sugar-free",
        "Salt-free",
        "Cooked",
        "Cold"
      ]
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log(event.target.value);
    this.setState({
      //setState will allow to update the state
      [name]: value
    });
  }

  onFormSubmit(event) {
    console.log("submited");
    event.preventDefault();
    const {
      name,
      ingredients,
      preparation,
      meal,
      typeOfFood,
      specifications
    } = this.state;
    ConnectingRecipe.addRecipe({
      name,
      ingredients,
      preparation,
      meal,
      typeOfFood,
      specifications
    })
      .then(user => {
        this.props.history.push("/private");
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
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
          <Link to="/private">Profile photo</Link>
          <div></div>
          {/* add onSubmit on this form */}
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group>
              <Form.Label>Name your recipe</Form.Label>
              <Form.Control
                placeholder="Name"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.onValueChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Meal</Form.Label>
              <Form.Control
                as="select"
                placeholder="Meal"
                name="meal"
                value={this.state.meal}
                onChange={this.onValueChange}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Beverage">Beverage</option>
                <option value="Dessert">Dessert</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Type of Food</Form.Label>
              <Form.Control
                as="select"
                placeholder="Type"
                name="typeOfFood"
                value={this.state.typeOfFood}
                onChange={this.onValueChange}
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Raw">Raw</option>
                <option value="Fish">Fish</option>
                <option value="Meat">Meat</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Specifications</Form.Label>
              <Form.Control
                as="select"
                placeholder="Specification"
                name="specifications"
                value={this.state.specifications}
                onChange={this.onValueChange}
              >
                <option value="Gluten-free">Gluten-free</option>
                <option value="Sugar-free">Sugar-free</option>
                <option value="Salt-free">Salt-free</option>
                <option value="Cooked">Cooked</option>
                <option value="Cold">Cold</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ingredients</Form.Label>
              <label>
                <input
                  type="textarea"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Preparation</Form.Label>
              <input
                type="textarea"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        </div>
      )
    );
  }
}
