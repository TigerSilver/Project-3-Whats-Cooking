import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import * as AuthenticationServices from "./../services/auth-service";

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      username: ""
    };
    //the methos needs to be bind for being able to work with this
    this.onValueChange = this.onValueChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      //setState will allow to update the state
      [name]: value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const { email, password, firstName, lastName, username } = this.state;
    AuthenticationServices.signUpService({
      email,
      password,
      firstName,
      lastName,
      username
    })
      .then(user => {
        this.props.history.push("/home");
        console.log(user);
      })
      .catch(error => {
        console.log("ERROR", error);
        alert(error.message);
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
        <h3>Sign Up for a New Account</h3>
        {/* onSubmit={this.onFormSubmit}  this goes in the next line*/}
        <br />
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Add your first name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.onValueChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Surname</Form.Label>
            <Form.Control
              placeholder="Add your last name"
              name="lastName"
              value={this.state.lastName}
              onChange={this.onValueChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.onValueChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              placeholder="Email"
              name="email"
              type="email"
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
            <Form.Text>
              (For security reasons, your password needs to be at least 8 digits
              long)
            </Form.Text>
          </Form.Group>
          <Button className="btn-light" type="submit">
            Register
          </Button>
        </Form>
        <br />
      </Container>
    );
  }
}
