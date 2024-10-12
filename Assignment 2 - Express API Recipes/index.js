// File Name - Index.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 11 October 2024

// import express
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

//Define a route
app.use("/", recipeRoutes);

// setting a port
const port = 4000;

// start the server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
