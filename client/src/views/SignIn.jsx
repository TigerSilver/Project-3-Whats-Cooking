import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import * as AuthenticationServices from "./../services/auth-service";

export default class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    AuthenticationServices.logInService({
      email,
      password
    })
      .then(user => {
        this.props.history.push("/home");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container
        className="text-white"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundColor: "#2E8B57"
        }}
      >
        <h3>Log In into Your Account</h3>
        <br />
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.onValueChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onValueChange}
            />
          </Form.Group>
          <Button className="btn-light" type="submit">
            Log in
          </Button>
        </Form>
        <br />
      </Container>
    );
  }
}
