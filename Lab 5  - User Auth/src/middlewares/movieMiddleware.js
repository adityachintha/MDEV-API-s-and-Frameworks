// File Name - movieMiddleware.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

//Middleware to log incoming requests
const logger = (req, res, next) => {
  console.log(`${req.method}${req.originalUrl} - ${new Date().toISOString()}`);
  next();
};

// validating for creation or updating a movie
const validateMovie = (req, res, next) => {
  const { title, studio, year, genres, directors } = req.body;
  if (!title || !studio || !year || !genres || !directors) {
    return res
      .status(400)
      .send("Missing required fields - title, studio, year, genres, directors");
  }
  next();
};

//Middleware to handle 404
const handleNotFound = (req, res, next) => {
  res.status(404).send("Page not found/ something went wrong");
};

//export
module.exports = { logger, validateMovie, handleNotFound };
