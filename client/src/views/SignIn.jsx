import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
        this.props.history.push("/profile");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
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
          <Button type="submit">Sign in</Button>
        </Form>
      </div>
    );
  }
}
