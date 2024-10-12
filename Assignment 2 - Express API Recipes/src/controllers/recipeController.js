// File Name - recipeController.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 11 October 2024

//Import recipe model, fs
const Recipe = require("../models/recipeModel");
const fs = require("fs");

//Function to Import recipes
exports.importRecipes = async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("./recipes_list.json", "utf-8"));
    await Recipe.insertMany(data); // Import data into Mongo db
    res.status(200).send("Recipes imported to database successfully");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error Importing Recipes to database");
  }
};

//Function to list all recipes
exports.readRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Finds all the recipes in database
    res.status(200).json(recipes);
    console.log("Recipes retrived Successfully");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retreving recipes");
  }
};
