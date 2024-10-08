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
    res.status(500).send("Error Importing Movies");
  }
};

//Function to Reall all the movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movies.find(); //Find all the movies
    res.status(200).json(movies);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error Retreving Movies");
  }
};
