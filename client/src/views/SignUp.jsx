import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

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
    // this.onInputFileChange = this.onInputFileChange.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      //setState will allow to update the state
      [name]: value
    });
  }

  // onInputFileChange(event) {
  //   const name = event.target.name;
  //   const file = event.target.files[0];
  //   console.log(file);
  //   this.setState({
  //     [name]: file
  //   });
  // }

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
        this.props.setUser(user);
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
      <div className="bg--green">
        <Container className="text-white container--center">
          <div className="mt-5">
            <Link to="/">
              <Image src="./../../Logo.png" height="210" width="201" fluid />
            </Link>
          </div>
          <br />
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
                (For security reasons, your password needs to be at least 8
                digits long)
              </Form.Text>
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={this.onInputFileChange}
              />
            </Form.Group> */}
            <Button className="btn-light" type="submit">
              Register
            </Button>
          </Form>
          <br />
        </Container>
      </div>
    );
  }
}
