import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class LandingView extends Component {
  render() {
    return (
      <div
        className="text-white"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "220px",
          paddingBottom: "320px",
          backgroundColor: "#2E8B57"
        }}
      >
        <h1>[Logo Here]</h1>
        <p>
          Don't know what to cook for dinner? What's Cooking, a social app for
          recipe sharing, is here to help.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Link to="/login" className="btn btn-light mx-2">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-light mx-2">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}
