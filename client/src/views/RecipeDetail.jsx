import React, { Component, Fragment } from "react";

import * as RecipeService from "./../services/recipe-service";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
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
        {this.state.recipe && (
          <Fragment>
            <div
              style={{ backgroundImage: `url(${this.state.recipe.image})` }}
              className="recipe-detail-header"
            >
              {/* <Image
                src={this.state.recipe.image}
                thumbnail
                width="550"
                height="400"
              /> */}
              <Container>
                {/* <h1 className="appGreen-text">{this.state.recipe.name}</h1> */}
                <h1>{this.state.recipe.name}</h1>
                <div>
                  {[
                    // this.state.recipe.ingredients,
                    this.state.recipe.meal,
                    this.state.recipe.specifications,
                    this.state.recipe.typeOfFood
                  ].map(item => (
                    <span>{item}</span>
                  ))}
                </div>
              </Container>
            </div>
            <Container>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                {/* <Image
                  src={this.state.recipe.image}
                  thumbnail
                  width="550"
                  height="400"
                /> */}
                {/* <h1 className="appGreen-text">{this.state.recipe.name}</h1> */}
              </div>
              <br />
              <Card.Text>
                <strong className="appGreen-text">Ingredients:</strong>{" "}
                {this.state.recipe.ingredients}
              </Card.Text>
              <Card.Text>
                <strong className="appGreen-text">Preparation:</strong>{" "}
                {this.state.recipe.preparation}
              </Card.Text>
              <Card.Text>
                <strong className="appGreen-text">Meal:</strong>{" "}
                {this.state.recipe.meal}
              </Card.Text>
              <Card.Text>
                <strong className="appGreen-text">Specifications:</strong>{" "}
                {this.state.recipe.specifications}
              </Card.Text>
              <Card.Text>
                <strong className="appGreen-text">Type of food:</strong>{" "}
                {this.state.recipe.typeOfFood}
              </Card.Text>
            </Container>
          </Fragment>
        )}
        <br />
      </div>
    );
  }
}
