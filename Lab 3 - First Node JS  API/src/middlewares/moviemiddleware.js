// File Name - movieMiddleware.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 7th October 2024

//Middleware to log incoming requests
const logger = (req, res, next) => {
  console.log(
    `${req.method}, ${req.originalURL} - ${new Date().toISOString()}`
  );
  next();
};
