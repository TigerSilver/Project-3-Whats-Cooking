"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  _addedBy: {
    //this way is possible to grab the info of the user who publish the recipe
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  ingredients: {
    type: String
    // required: true
  },
  preparation: {
    type: String
    // required: true
  },
  image: {
    type: String
    // required: true
  },
  meal: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Beverage", "Dessert"]
  },
  typeOfFood: {
    type: String,
    enum: ["Vegetarian", "Vegan", "Raw", "Fish", "Meat"]
  },
  specifications: {
    type: String,
    enum: ["Gluten-free", "Sugar-free", "Salt-free", "Cooked", "Cold"]
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
