"use strict";

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  preparation: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  meal: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"]
  },
  typeOfFood: {
    type: String,
    enum: ["Vegetarian", "Vegan", "Raw", "Fish", "Meat"]
  },
  specifications: {
    type: String,
    enum: ["Gluten-free", "Sugar-free", "Salt-free", "Cooked", "Cold"]
  },
  others: {
    type: String,
    enum: ["Beverage", "Dessert"]
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
