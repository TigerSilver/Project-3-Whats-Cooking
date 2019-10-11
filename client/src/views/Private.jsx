import React, { Component } from "react";

import * as AuthenticationServices from "./../services/auth-service";
import * as RecipeService from "./../services/recipe-service";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RecipeItem from "./../component/RecipeItem";

export default class PrivateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      // TODO create an array of user recipes
      recipes: []
    };
    //methods need to be bind in order to work
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentDidMount() {
    AuthenticationServices.loggedIn()
      .then(user => {
        this.setState({
          user
        });
        RecipeService.addedBy(user._id) //like is a view can have accsess to this.props.match
          .then(recipes => {
            this.setState({
              recipes
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteRecipe(_id) {
    RecipeService.deleteService(_id)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const user = this.state.user;
    return (
      <Container>
        {(!user && (
          <div>
            <h1>Not allowed...</h1>
          </div>
        )) || (
          <div>
            {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
            {/* TODO map through the array of recipes (if it exists) */}
            <h1>Hello, {this.state.user.firstName}</h1>
            <br />
            <p>Below you can find your recipes:</p>
            <Row>
              {this.state.recipes.map(recipe => (
                <Col key={recipe._id} sm={6} className="mb-3">
                  <RecipeItem
                    recipe={recipe}
                    isOwnedByUser={true}
                    deleteRecipe={this.deleteRecipe}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    );
  }
}
