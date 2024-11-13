// File Name - recipeModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 12 November 2024

//import mongoose
const mongoose = require("mongoose");

//writing schema for the recipes list

const RecipeSchema = new mongoose.Schema({
  recipeName: { type: String },
  ingredients: { type: [String] },
  cookingTime: { type: Number },
  difficulty: { type: String },
  cuisine: { type: String },
  description: { type: String },
  photoLink: { type: String },
  averageRating: { type: Number },
});

//exporting the schema
module.exports = mongoose.model("Recipe", RecipeSchema);
