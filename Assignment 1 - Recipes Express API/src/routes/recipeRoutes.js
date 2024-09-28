// File Name - recipeModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 09/28/2024

// importing express and router

const express = require("express");
const router = express.Router();

const { addRecipesList } = require("../controllers/recipeController");

//route to create recipes from JSON file
router.post("/import", addRecipesList);

module.exports = router;
