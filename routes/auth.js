"use strict";
const { Router } = require("express");
const router = Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

// Here we require our user model, in order to grab the schema
const User = require("./../models/user");

router.post("/signup", (req, res, next) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    profilePicture
  } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Provide username and password"
    });
    return;
  }
  if (password.length < 10) {
    res.status(400).json({
      message: "Please make your password at least 10 digits long for security"
    });
  }

  User.findOne(
    {
      email
    },
    (err, foundUser) => {
      if (err) {
        res.status(500).json({
          message: "Email check went bad."
        });
        return;
      }
      if (foundUser) {
        res.status(400).json({
          message: "Email taken.Choose another one."
        });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        email: email,
        password: hashPass,
        firstName,
        lastName,
        username,
        profilePicture
      });

      aNewUser.save(err => {
        if (err) {
          res.status(400).json({
            message: "Saving user to database went wrong."
          });
          console.log(email, username, firstName, lastName, password);
          return;
        }

        //in the next step the user will loggin automatically after the sign up.
        // .login() is a method predefined by passport
        req.login(aNewUser, err => {
          if (err) {
            res.status(500).json({
              message: "Login after signup went bad"
            });
            return;
          }
          //the next step will send the user information to the front end
          res.status(200).json(aNewUser);
        });
      });
    }
  );
});

router.post("/login", (req, res, next) => {});

module.exports = router;
