// File Name - recipeModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 7th October 2024

//import expresss
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//initialize the express app
const app = express();

//middleware to parse-json body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the PORT
const port = 3000;

//Connect the MongoDB Atlash
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Mongo DB");
  })
  .catch((error) => {
    console.log("Error connecting to Mongo DB", error);
  });

//Define a route
app.get("/", (req, res) => {
  res.send("Welcome to my first program of nodejs express");
});

//start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
