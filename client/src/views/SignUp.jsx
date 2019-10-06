import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        {/* onSubmit={this.onFormSubmit}  this goes in the next line*/}
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Username"
              name="username"
              value={this.state.username}
              //   onChange={this.onValueChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              //   onChange={this.onValueChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              as="select"
              placeholder="Campus"
              name="campus"
              value={this.state.campus}
              //   onChange={this.onValueChange}
            >
              <option value="" disabled>
                Choose a Campus
              </option>
              {this.state.campusOptions.map(campus => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Course</Form.Label>
            <Form.Control
              as="select"
              placeholder="Course"
              name="course"
              value={this.state.course}
              onChange={this.onValueChange}
            >
              <option value="" disabled>
                Choose a Course
              </option>
              {this.state.courseOptions.map(course => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
    );
  }
}
