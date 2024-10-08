// File Name - Index.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 7th October 2024

//import expresss
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const fs = require("fs");

//initialize the express app
const app = express();

//Initilize the Databse Connection
const initiateMongoServer = require("./db");
initiateMongoServer();

//middleware to parse-json body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
