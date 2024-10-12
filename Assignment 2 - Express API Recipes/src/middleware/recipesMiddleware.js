// File Name - recipesMiddleware.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 11 October 2024

//Middleware for logger
const logger = (req, res, next) => {
  console.log(`${req.method}${req.originalUrl} - ${new Date().toISOString()}`);
  next();
};
