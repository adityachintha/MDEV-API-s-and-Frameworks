//import mongoose
const mongoose = require("mongoose");

//writing schema for the recipes list

const RecipeSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  ingredients: { type: [String], required: true },
});
