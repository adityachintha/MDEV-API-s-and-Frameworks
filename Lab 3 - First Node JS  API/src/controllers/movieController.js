// File Name - movieController.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 7th October 2024

//import the movies
const Movies = require("../models/moviesModel");
const fs = require("fs");

//funtion to import movies from json to database
exports.importMovies = async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));
    await Movies.insertMany(data); // Import data into Mongo db
    res.status(200).send("Movies imported Successfully");
  } catch (e) {
    console.error(e);
  }
};
