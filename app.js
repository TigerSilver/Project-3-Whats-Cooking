"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const serveFavicon = require("serve-favicon");

const expressSession = require("express-session");
const passport = require("passport");
const authRoute = require("./routes/auth");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");

const deserializeUserMiddleware = require("./middleware/deserialize-user");

const app = express();

require("./configs/passport");

app.use(serveFavicon(join(__dirname, "public/images", "favicon.ico")));
app.use(express.static(join(__dirname, "client/build")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
    resave: true,
    saveUninitialized: false, // wasfalse before
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    })
  })
);

app.use(deserializeUserMiddleware);

app.use(passport.initialize());
app.use(passport.session());

//authRoute have to be here so is able to grab all the configuration from the upper lines to work
app.use("/auth", authRoute);

app.get("*", (req, res, next) => {
  res.sendFile(join(__dirname, "./client/build/index.html"));
});

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.json({ type: "error", error: { message: error.message } });
});

module.exports = app;
