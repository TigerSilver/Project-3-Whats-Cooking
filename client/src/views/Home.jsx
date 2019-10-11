import React, { Component } from "react";

import { listRecipes } from "./../services/recipe-service";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import RecipeItem from "./../component/RecipeItem";

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    // methods need to be bind in order to work
    this.state = {
      recipes: [],
      user: null
    };
  }

  componentDidMount() {
    listRecipes()
      .then(recipes => {
        this.setState({
          recipes
        });
      })
      .catch(error => {
        console.log(error);
      });
    console.log("RECIPES AFTER MOUNTING", this.state.recipes);
  }

  render() {
    const user = this.props.user;
    return (
      <Container>
        {(!user && (
          <div>
            <h1>Not allowed...</h1>
          </div>
        )) || (
          <div>
            <h3
              className="title-green"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              Latest Recipes
            </h3>
            <br />
            <Row>
              {this.state.recipes.map(recipe => (
                <Col key={recipe._id} sm={6} className="mb-3">
                  <RecipeItem recipe={recipe} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    );
  }
}
