// File Name - movieModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 7th October 2024

//import

const mongoose = require("mongoose");
const schema = mongoose.schema;

const moviesSchema = new schema({
  movieID: { type: String },
  title: { type: String, required: true },
  studio: { type: String, required: true },
  genres: { type: [String], required: true },
});
