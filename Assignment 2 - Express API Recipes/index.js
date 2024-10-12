// File Name - Index.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 11 October 2024

//Importing modules
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const recipeRoutes = require("./src/routes/recipeRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Initialize the express app
const app = express();

//Initializing Connection to mongodb Atlas
const mongoServer = require("./db");
mongoServer();

//Defining a root route
app.use("/", recipeRoutes);

//Setting a port
const port = 4000;

//Start the server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
