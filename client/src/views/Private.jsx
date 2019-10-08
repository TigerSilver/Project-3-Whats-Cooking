import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class PrivateView extends Component {
  render() {
    return (
      <div>
        <Link to="/home">Home</Link>
        <h1>Hellooooo private</h1>
      </div>
    );
  }
}
