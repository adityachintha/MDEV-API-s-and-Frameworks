// File Name - recipeModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 09/28/2024

//import recipe model, fs and path

const Recipe = require("../models/recipeModel");
const fs = require("fs");
const path = require("path");

const addRecipesList = async (req, res) => {
  try {
    // load the json file
    const jsonFile = path.join("recipes_list.json");
    const data = fs.readFileSync(jsonFile, "utf-8");
    const recipes = JSON.parse(data);

    // insert multiple documents into Mongo DB
    await Recipe.insertMany(recipes);

    res.status(201).json({
      message: "Recipes have been successfully added to the database",
    });

    // adding error status and message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
//exporting the module exports
module.exports = { addRecipesList };
