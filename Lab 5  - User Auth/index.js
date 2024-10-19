// File Name - Index.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

//import expresss
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const fs = require("fs");
const movieRoutes = require("./src/routes/movieRoutes");
const userRoutes = require("./src/routes/userRoutes");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const { logger, handleNotFound } = require("./src/middlewares/movieMiddleware");

//initialize the express app
const app = express();

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

//user the route for users
app.use("/users", userRoutes);

app.use(handleNotFound); // for handling errors

//start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
