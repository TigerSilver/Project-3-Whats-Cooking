import React, { Component } from "react";

import { listRecipes } from "./../services/recipe-service";

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./../App.css";

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    // methods need to be bind in order to work
    this.state = {
      recipes: [],
      user: null
    };
  }

  componentDidMount() {
    listRecipes()
      .then(recipes => {
        this.setState({
          recipes
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const user = this.props.user;
    return (
      <Container>
        {(!user && (
          <div>
            <h1>Not allowed...</h1>
          </div>
        )) || (
          <div>
            <Row>
              {this.state.recipes.map(recipes => (
                <Col key={recipes._id} sm={6} className="mb-3">
                  <Card>
                    <Card.Body>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                          }}
                        >
                          <Card.Title className="appGreen-text">
                            {recipes.name}
                          </Card.Title>
                          <Link
                            to={`/recipeDetail/${recipes._id}`}
                            variant="primary"
                          >
                            See more
                          </Link>
                        </div>
                        <Image
                          src={recipes.image}
                          width="120"
                          height="111"
                          rounded
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    );
  }
}
