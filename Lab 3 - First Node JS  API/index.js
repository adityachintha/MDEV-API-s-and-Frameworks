//import expresss
const express = require("express");

//initialize the express app
const app = express();

// set the PORT
const port = 5000;

//start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
