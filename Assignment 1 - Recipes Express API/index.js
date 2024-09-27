// import express

const express = require("express");

// Initialize the express app

const app = express();

// setting a port
const port = 4000;

// start the server
app.listen(port, () => {
  console.log(`server is running on http://locahost:${port}`);
});
