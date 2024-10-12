// File Name - recipeRoutes.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 11 October 2024

//Importing express and router

const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipeController");

//Route to import recipes from JSON file
router.post("/import", recipeController.importRecipes);

// Route to read all the recipes
router.get("/", recipeController.readRecipes);

//Route to find a recipe by ID
router.get("/:id", recipeController.findRecipeById);

//Route to create a new recipes
router.post("/create", recipeController.createNewrecipes);

module.exports = router;
