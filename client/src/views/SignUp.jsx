import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      });
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        {/* onSubmit={this.onFormSubmit}  this goes in the next line*/}
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="Add your first name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.onValueChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
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
            <Form.Label>Email</Form.Label>
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
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}
