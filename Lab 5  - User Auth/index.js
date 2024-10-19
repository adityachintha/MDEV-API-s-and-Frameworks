// File Name - Index.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

//import expresss
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config({ path: "./config.env" });
const fs = require("fs");
const movieRoutes = require("./src/routes/movieRoutes");
const authRoutes = require("./src/routes/authRoutes");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
require("./src/config/passportConfig");
const { logger, handleNotFound } = require("./src/middlewares/movieMiddleware");

//initialize the express app
const app = express();

//Set a session and passport
const secretKey =
  process.env.SECRET_KEY || crypto.randomBytes(64).toString("hex");
console.log(`Generated Secret KEY: ${secretKey}`);
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Initilize the Databse Connection
const initiateMongoServer = require("./db");
initiateMongoServer();

//middleware to parse-json body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger); // for logger

// set the PORT
const port = 3000;

//Define a route
app.get("/", (req, res) => {
  res.send("Welcome to my first program of nodejs express");
});

//use the route for Movies
app.use("/movies", movieRoutes);

//use the route for users
app.use("/auth", authRoutes);

app.use(handleNotFound); // for handling errors

//start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
