// File Name - recipeRoutes.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 12 November 2024

//Importing express and router
const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const verifyToken = require("../middleware/auth");

//Route to import recipes from JSON file
router.post("/import", recipeController.importRecipes);

// Route to read all the recipes
router.get("/", recipeController.readRecipes);

//Route to find a recipe by ID
router.get("/:id", recipeController.findRecipeById);

//Route to create a new recipes
router.post("/create", recipeController.createNewrecipes);

//Route to update a recipe
router.put("/update/:id", verifyToken, recipeController.updateRecipe);

//Route to delete a recipes
router.delete("/delete/:id", verifyToken, recipeController.deleteRecipe);

module.exports = router;
