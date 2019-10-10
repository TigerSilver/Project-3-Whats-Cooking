import React, { Component } from "react";

import Image from "react-bootstrap/Image";

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
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "#2E8B57"
        }}
      >
        <Image src="./../../Logo.png" height="490" width="481" fluid />
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
