import React, { Component } from "react";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import * as AuthenticationServices from "./../services/auth-service";

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    //the methoDs needs to be bind for being able to work
    this.handleClick = this.handleClick.bind(this);
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

  render() {
    return (
      <div>
        <Link to="/login">Profile photo</Link>
        <div>
          <Link to="/addRecipe">+</Link>
        </div>
        <h1>This the Home of all the recipes</h1>

        <Button onClick={this.handleClick}>Log out</Button>
      </div>
    );
  }
}
