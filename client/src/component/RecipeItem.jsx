import React from "react";

import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

export default props => (
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
          <Card.Title className="appGreen-text">{props.recipe.name}</Card.Title>
          <p>Author: {props.recipe._addedBy.username}</p>
          <Link
            to={`/recipeDetail/${props.recipe._id}`}
            variant="primary"
            className="text-success"
          >
            See more
          </Link>
        </div>
        {props.recipe.image && (
          <Image src={props.recipe.image} width="120" height="111" rounded />
        )}
      </div>
    </Card.Body>
    {props.isOwnedByUser && (
      <Card.Body>
        <Link className="btn btn-success" to={`/edit/${props.recipe._id}`}>
          Edit
        </Link>
        <Button
          variant="danger"
          onClick={() => props.deleteRecipe(props.recipe._id)}
        >
          Delete
        </Button>
      </Card.Body>
    )}
  </Card>
);
