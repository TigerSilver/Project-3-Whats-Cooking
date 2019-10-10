"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
    // required: true
  },
  lastName: {
    type: String
    // required: true
  },
  username: {
    type: String,
    // required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  },
  favorites: [
    {
      //in this way we are telling that will bring the id of recipes for the private page
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ],
  cookLater: [
    {
      //in this way we are telling that will bring the id of recipes for the private page
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
