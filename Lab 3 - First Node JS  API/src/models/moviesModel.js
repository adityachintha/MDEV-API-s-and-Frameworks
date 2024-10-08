// File Name - movieModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 7th October 2024

//import

const mongoose = require("mongoose");
const { Schema } = mongoose;

//Schema for the Movies
const moviesSchema = new Schema({
  movieID: { type: String, required: true },
  title: { type: String, required: true },
  studio: { type: String, required: true },
  genres: { type: [String], required: true },
  directors: { type: [String], required: true },
  writers: { type: [String], required: true },
  actors: { type: [String], required: true },
  year: { type: Number, required: true },
  length: { type: Number, required: true },
  shortDescription: { type: String, required: true },
  mpaRating: { type: String, required: true },
  criticsRating: { type: Number, required: true },
});

//Movies Model
const Movies = mongoose.model("movies", moviesSchema);

//exporting the movies model
module.exports = Movies;
