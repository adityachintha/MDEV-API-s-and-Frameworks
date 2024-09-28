// import express
const express = require("express");
const bodyparser = require("body-parser");

// Initialize the express app
const app = express();

//Define a route
app.get("/", (req, res) => {
  res.send("Welcome to my first project");
});

// setting a port
const port = 4000;

// start the server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
