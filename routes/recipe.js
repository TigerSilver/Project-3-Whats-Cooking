"use strict";

const { Router } = require("express");
const router = Router();

const Recipe = require("../models/recipe");

router.get("/recipes", (req, res, next) => {
  Recipe.find({}, (error, recipes) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ recipes: recipes });
    }
  });
});

router.post("/addRecipe", (req, res, next) => {
  const {
    //the sam name: name, etc
    name,
    ingredients,
    preparation,
    meal,
    typeOfFood,
    specifications
  } = req.body;

  // const image = this part is when is added the cloudinary part

  Recipe.create({
    name,
    _addedBy: req.user._id, //this pick the user id with all the info
    ingredients,
    preparation,
    meal,
    typeOfFood,
    specifications
    // image: this part is when is added the cloudinary part
  })
    .then(recipe => {
      res.json({ success: true, recipe }); // this data is the one that we will send to the front como data.
    })
    .catch(err => {
      console.log("An error happened:", err);
    });
});

router.get("/edit/:id", (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then(recipe => {
      res.json({ success: true, recipe });
    })
    .catch(err => {
      console.log("The editing went wrong");
    });
});

module.exports = router;
