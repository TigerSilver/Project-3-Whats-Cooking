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
    this.state = {
      recipes: [],
      toggle: false
    };
    this.showForm = this.showForm.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  showForm() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      //setState will allow to update the state
      [name]: value
    });
  }

  deleteRecipe(_id) {
    console.log("eres tu", _id);

    RecipeService.deleteService(_id)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.props.recipes.map(recipe => (
          <div key={recipe._id}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Link to={`/recipedetail/${recipe._id}`}> {recipe.name} </Link>
                <Link to={`/edit/${recipe._id}`}>
                  <Badge variant="success">Edit</Badge>
                </Link>
                <Badge
                  variant="danger"
                  onClick={() => this.deleteRecipe(recipe._id)}
                >
                  Delete
                </Badge>
              </ListGroup.Item>
            </ListGroup>
            <Card key={recipe._addedBy} style={{ width: "18rem" }}>
              {" "}
              {/* <Button onClick={this.showForm} variant="primary">
                Edit
              </Button>
              {this.state.toggle && <UpdateRecipe recipeInfo={recipe} />} */}
              <Button
                variant="danger"
                onClick={() => this.deleteRecipe(recipe._id)}
              >
                Delete
              </Button>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}
