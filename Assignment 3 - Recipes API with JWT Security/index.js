// File Name - Index.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 12 November 2024

//Importing modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const recipeRoutes = require("./src/routes/recipeRoutes");
const userRoutes = require("./src/routes/userRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const {
  logger,
  handleNotFound,
} = require("./src/middleware/recipesMiddleware");

// Initialize the express app
const app = express();

//Initializing Connection to mongodb Atlas
const mongoServer = require("./db");
mongoServer();

//Middleware to parse-json body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware to use Logger
app.use(logger);

//Defining a root route
app.get("/", (req, res) => {
  res.send("Welcome to Express API for Top 20 Recipes");
});


//Middleware to Handle Not Found Errors
app.use(handleNotFound);

//Setting a port
const port = process.env.PORT || 3000;

//Start the server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
