import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import "./../App.css";

import * as AuthenticationServices from "./../services/auth-service";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    // methods need to be bind in order to work
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

  get shouldDisplayNavbar() {
    // const path = this.props.match.path;
    const path = this.props.location.pathname;
    const shouldDisplay = path !== "/";
    return shouldDisplay;
  }

  render() {
    const shouldDisplayNavbar = this.shouldDisplayNavbar;
    const user = this.props.user;
    return (
      shouldDisplayNavbar && (
        <Navbar
          style={{
            backgroundColor: "#2E8B57"
          }}
          className="mb-3"
        >
          <Container>
            <Navbar.Collapse className="justify-content-start">
              <Link to="/home" className="btn">
                Home
              </Link>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              {user && (
                <Navbar.Text className="text-white">
                  <Link to="/addRecipe" className="btn">
                    New Recipe
                  </Link>
                  Signed in as:{" "}
                  <Link to="/private" className="btn">
                    {user.firstName}
                  </Link>
                  <Button onClick={this.handleClick}>Log out</Button>{" "}
                </Navbar.Text>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
    );
  }
}

export default withRouter(AppNavbar);
