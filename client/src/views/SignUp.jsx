import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    console.dir(event.target);
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      //setState will allow to update the state
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        {/* onSubmit={this.onFormSubmit}  this goes in the next line*/}
        <Form>
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
              value={this.password}
              onChange={this.onValueChange}
            />
          </Form.Group>
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
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}
