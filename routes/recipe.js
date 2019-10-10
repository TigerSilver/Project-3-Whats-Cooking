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

const uploader = require("../configs/cloudinary-setup");

router.post(
  "/addRecipe",
  routeGuardMiddleware(true),
  uploader.single("image"),
  (req, res, next) => {
    const {
      //the same name: name, etc
      name,
      ingredients,
      preparation,
      meal,
      typeOfFood,
      specifications
    } = req.body;
    console.log(req.file);
    let image;
    if (req.file) {
      image = req.file.url;
    }
    // const image = this part is when is added the cloudinary part

    Recipe.create({
      name,
      _addedBy: req.user._id, //this pick the user id with all the info
      ingredients,
      preparation,
      meal,
      typeOfFood,
      specifications,
      image
    })
      .then(recipe => {
        res.json({ success: true, recipe }); // this data is the one that we will send to the front como data.
      })
      .catch(err => {
        console.log("An error happened:", err);
        next(err); // this data is the one that we will send to the front como data.
      });
  }
);

router.patch("/edit/:id", routeGuardMiddleware(true), (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const id = {
    _id: req.params.id
  };
  const data = {
    // this is the data that can be changed by the user
    name,
    ingredients,
    preparation
  };
  // The new option is going to make findOneAndUpdate resolve with the edited doc
  const options = {
    new: true
  };
  Recipe.findOneAndUpdate(id, data, options)
    .then(recipe => {
      res.json({ success: true, recipe });
    })
    .catch(err => {
      console.log("The editing went wrong", err);
    });
});

router.get(
  "/recipedetail/:id",
  routeGuardMiddleware(true),
  (req, res, next) => {
    Recipe.findById({ _id: req.params.id })
      .populate("_addedBy")
      .then(recipe => {
        res.json({ success: true, recipe });
      })
      .catch(err => {
        console.log("Charge details went wrong", err);
      });
  }
);

// router.get("/editrecipe/:id", routeGuardMiddleware(true), (req, res, next) => {
//   Recipe.findById({ _id: req.params.id })
//     .populate("_addedBy")
//     .then(recipe => {
//       res.json({ success: true, recipe });
//     })
//     .catch(err => {
//       console.log("Charge details went wrong", err);
//     });
// });

router.get("/addedBy/:id", (req, res, next) => {
  // console.log(req.params.id);

  Recipe.find({ _addedBy: req.params.id })
    .then(recipes => {
      res.json({ success: true, recipes });
    })
    .catch(err => {
      console.log("Charge details went wrong", err);
    });
});

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
