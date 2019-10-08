import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class PlaneView extends Component {
  render() {
    return (
      <div>
        <h1>Don't know what to cook for meal?</h1>
        <p>
          What's Cooking, a social app for recipe sharing, is here to help!!!
        </p>
        <Link to="/login" className="btn">
          Log In
        </Link>
        <Link to="/signup" className="btn">
          Sign Up
        </Link>
      </div>
    );
  }
}
