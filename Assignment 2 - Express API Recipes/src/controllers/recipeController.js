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

//Function to find recipe by ID
exports.findRecipeById = async (req, res) => {
  try {
    const recipeById = await Recipe.findById(req.params.id);
    if (!recipeById) {
      return res.status(404).send("Recipe is not found");
    }
    res.status(200).json(recipeById);
    console.log("Recipes is found by ID");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retreving recipes by id");
  }
};

//Function to create a new recipes
exports.createNewrecipes = async (req, res) => {
  try {
    const createRecipes = new Recipe(req.body);
    await createRecipes.save();
    res.status(201).json(createRecipes);
    console.log("recipe successfully created");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error creating recipe");
  }
};
