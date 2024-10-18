// File Name - movieModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

//import

const mongoose = require("mongoose");
const { Schema } = mongoose;

//Schema for the Movies
const moviesSchema = new Schema({
  movieID: { type: String },
  title: { type: String },
  studio: { type: String },
  genres: { type: [String] },
  directors: { type: [String] },
  writers: { type: [String] },
  actors: { type: [String] },
  year: { type: Number },
  length: { type: Number },
  shortDescription: { type: String },
  mpaRating: { type: String },
  criticsRating: { type: Number },
});

//Movies Model
const Movies = mongoose.model("movies", moviesSchema);

//exporting the movies model
module.exports = Movies;
