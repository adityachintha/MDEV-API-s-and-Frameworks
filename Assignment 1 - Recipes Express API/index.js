// import express
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Initialize the express app
const app = express();

//Connection to mongodb Atlas

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("Connected to mongo db");
  })
  .catch((error) => {
    console.error("error connecting to mongodb", error);
  });

//Define a route
app.get("/", (req, res) => {
  res.send("Welcome to my Recipe Assignment 1");
});

// setting a port
const port = 4000;

// start the server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
