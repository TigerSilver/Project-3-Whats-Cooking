import React, { Component } from "react";

import { listRecipes } from "./../services/recipe-service";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import "./../App.css";

import * as AuthenticationServices from "./../services/auth-service";

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    // methods need to be bind in order to work
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      recipes: [],
      user: null
    };
  }

  handleClick() {
    AuthenticationServices.logOutService()
      .then(user => {
        this.props.history.push("/");
        // console.log(user);
      })
      .catch(error => {
        console.log("ERROR", error);
      });
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
          <Navbar
            style={{
              backgroundColor: "#2E8B57"
            }}
          >
            <Navbar.Collapse className="justify-content-start">
              <Navbar.Text class="text-white">
                Signed in as: <Link to="/private">[Profile Name]</Link>
              </Navbar.Text>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text class="text-white">
                <Link to="/addRecipe">New Recipe</Link>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          <div>
            <h1>Home</h1>
            <p>Here are presented all the published recipes.</p>

            {this.state.recipes.map(recipes => (
              <Card key={recipes._id} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{recipes.name}</Card.Title>
                  <Link to={`/recipeDetail/${recipes._id}`} variant="primary">
                    See more
                  </Link>
                </Card.Body>
              </Card>
            ))}

            <Button onClick={this.handleClick}>Log out</Button>
          </div>
        </div>
      )
    );
  }
}
