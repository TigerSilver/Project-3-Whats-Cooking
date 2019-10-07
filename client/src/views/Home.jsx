import React, { Component } from "react";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class HomeView extends Component {
  render() {
    return (
      <div>
        <Link to="/login">Profile photo</Link>
        <div>
          <Link to="/addRecipe">+</Link>
        </div>
        <h1>This the Home of all the recipes</h1>

        <Button>Log out</Button>
      </div>
    );
  }
}
