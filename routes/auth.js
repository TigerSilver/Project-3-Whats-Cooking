"use strict";
const { Router } = require("express");
const router = Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

// Below is the middleware for backend protection:
const routeGuardMiddleware = require("./../middleware/route-guard");

// Here we require our user model, in order to grab the schema
const User = require("./../models/user");

const uploader = require("../configs/cloudinary-setup");

router.post(
  "/signup",
  routeGuardMiddleware(false),
  uploader.single("image"),
  (req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;

    let profilePicture;
    if (req.file) {
      profilePicture = req.file.url;
    }

    if (!email || !password) {
      res.status(400).json({
        message: "Provide username and password"
      });
      return;
    }
    if (password.length < 8) {
      res.status(400).json({
        message:
          "For security reasons, your password needs to be at least 8 digits long"
      });
      return;
    }

    User.findOne(
      {
        email
      },
      (err, foundUser) => {
        if (err) {
          res.status(500).json({
            message: "Email check went bad"
          });
          return;
        }
        if (foundUser) {
          res.status(400).json({
            message: "Email taken. Choose another one"
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
              message: "Saving user to database went wrong"
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
            res.status(200).json({ user: aNewUser });
          });
        });
      }
    );
  }
);

router.post("/login", routeGuardMiddleware(false), (req, res, next) => {
  passport.authenticate("local", (error, logged, failure) => {
    if (error) {
      res.status(500).json({ message: "The authentication went wrong" });
      return;
    }
    if (!logged) {
      res.status(401).json(failure);
      return;
    }

    //here we maintain the user in the session, is saved
    req.login(logged, error => {
      if (error) {
        res
          .status(500)
          .json({ message: "It went wrong maintain the session." });
        return;
      }
      res.status(200).json({ user: logged });
    });
  })(req, res, next); // ask ze what is happening here
});

router.post("/logout", routeGuardMiddleware(true), (req, res, next) => {
  req.logout(); // already defined by passport not necessary in this req.session.destroy
  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/loggedin", routeGuardMiddleware(true), (req, res, next) => {
  if (req.isAuthenticated()) {
    //is already defined by passport
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

router.patch("/edit/:id", routeGuardMiddleware(true), (req, res, next) => {
  const { firstName, lastName } = req.body;
  const query = {
    _id: req.params.id
  };
  const data = {
    // this is the data that the user can edit
    firstName,
    lastName
  };
  // The new option is going to make findOneAndUpdate resolve with the edited doc
  const options = {
    new: true
  };
  User.findOneAndUpdate(query, data, options)
    .then(recipe => {
      res.json({ success: true, recipe });
    })
    .catch(err => {
      console.log("The editing went wrong", err);
    });
});

module.exports = router;
