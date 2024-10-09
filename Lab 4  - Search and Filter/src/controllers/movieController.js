// File Name - movieController.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 8th October 2024

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

//Function to Read all the movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movies.find(); //Find all the movies
    res.status(200).json(movies);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error Retreving Movies");
  }
};

//Function to create a new movie
exports.createMovies = async (req, res) => {
  try {
    const newMovie = new Movies(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error Creating Movie");
  }
};

//Get a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movieById = await Movies.findById(req.params.id);
    if (!movieById) {
      return res.status(404).send("Movie is not found");
    }
    res.status(201).json(movieById);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error Findding Movie by ID");
  }
};

//Update a Movie
exports.updateMovie = async (req, res) => {
  try {
    const updateMovie = await Movies.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateMovie) {
      return res.status(404).send("Movie is not updated");
    }
    res.status(201).json(updateMovie);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error Updating the movie");
  }
};

// Delete a Movie
exports.deleteMovie = async (req, res) => {
  try {
    const deleteMovie = await Movies.findByIdAndDelete(req.params.id);
    if (!deleteMovie) {
      return res.status(404).send("Movie is not deleted");
    }
    res.status(201).json(deleteMovie);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error Deleting the movie");
  }
};
