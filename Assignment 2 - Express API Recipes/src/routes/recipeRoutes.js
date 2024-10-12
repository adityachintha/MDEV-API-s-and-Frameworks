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

module.exports = router;
