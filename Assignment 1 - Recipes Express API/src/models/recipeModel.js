// File Name - recipeModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 09/28/2024

//import mongoose
const mongoose = require("mongoose");

//writing schema for the recipes list

const RecipeSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  ingredients: { type: [String], required: true },
  cookingTime: { type: Number, required: true },
  difficulty: { type: String, required: true },
  cuisine: { type: String, required: true },
  description: { type: String, required: true },
});
