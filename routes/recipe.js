"use strict";

const { Router } = require("express");
const router = Router();

const Recipe = require("../models/recipe");

// Below is the middleware for backend protection:
const routeGuardMiddleware = require("./../middleware/route-guard");

router.get("/recipes", routeGuardMiddleware(true), (req, res, next) => {
  Recipe.find({}, (error, recipes) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ recipes: recipes });
    }
  });
});

router.post("/addRecipe", routeGuardMiddleware(true), (req, res, next) => {
  const {
    //the same name: name, etc
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

router.patch("/edit/:id", routeGuardMiddleware(true), (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const query = {
    _id: req.params.id
  };
  const data = {
    // this is the data that the
    name,
    ingredients,
    preparation
  };
  // The new option is going to make findOneAndUpdate resolve with the edited doc
  const options = {
    new: true
  };
  Recipe.findOneAndUpdate(query, data, options)
    .then(recipe => {
      res.json({ success: true, recipe });
    })
    .catch(err => {
      console.log("The editing went wrong", err);
    });
});

router.get(
  "/recipeDetail/:id",
  routeGuardMiddleware(true),
  (req, res, next) => {
    Recipe.findById({ _id: req.params.id })
      .then(recipe => {
        res.json({ success: true, recipe });
      })
      .catch(err => {
        console.log("Charge details went wrong", err);
      });
  }
);

router.delete("/delete/:id", routeGuardMiddleware(true), (req, res, next) => {
  Recipe.remove({ _id: req.params.id })
    .then(result => {
      res.json({ success: true, result });
    })
    .catch(err => {
      console.log("It wasn't possible to eliminate the recipe.", err);
    });
});

module.exports = router;
