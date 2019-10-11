import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

import * as AuthenticationServices from "./../services/auth-service";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    // methods need to be bind in order to work
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    AuthenticationServices.logOutService()
      .then(() => {
        this.props.setUser(null);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }

  get shouldDisplayNavbar() {
    // const path = this.props.match.path;
    const path = this.props.location.pathname;
    const excludedViews = ["/", "/signup", "/login"];
    const shouldDisplay = !excludedViews.includes(path);
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
          className="mb-3 recipe-app-navbar"
        >
          <Container>
            <Navbar.Collapse className="justify-content-start">
              {user && (
                <Navbar.Text className="text-white">
                  <Image
                    src="DefaultProfileImg.png"
                    height="40"
                    width="40"
                    roundedCircle
                  />{" "}
                  <Link to="/private" className="btn text-white">
                    {user.firstName}
                  </Link>
                </Navbar.Text>
              )}
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-center ml-5 pl-3">
              <Link to="/home">
                <Image src="./../../Logo.png" height="120" width="111" fluid />
              </Link>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Link to="/addRecipe" className="btn text-white">
                New Recipe
              </Link>
              <Button className="btn-light" onClick={this.handleClick}>
                Log out
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
    );
  }
}

export default withRouter(AppNavbar);
