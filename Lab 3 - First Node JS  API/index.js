// File Name - recipeModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 7th October 2024

//import expresss
const express = require("express");

//initialize the express app
const app = express();

// set the PORT
const port = 3000;

//Define a route
app.get("/", (req, res) => {
  res.send("Welcome to my first program of nodejs express");
});

//start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
