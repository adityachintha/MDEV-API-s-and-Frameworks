// File Name - recipeController.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 12 November 2024

//Import recipe model, fs
const Recipe = require("../models/recipeModel");
const fs = require("fs");

//Function to import recipes.
// req - The request object param.
// res - The response object param.
// Returns success message on recipes import or an error message.

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
// req - The request object param.
// res - The response object param.
// Returns success message on reading recipes or an error message.

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
// req - The request object param.
// res - The response object param.
// Returns success message on reading recipe by id or an error message.

exports.findRecipeById = async (req, res) => {
  try {
    const recipeById = await Recipe.findById(req.params.id); //finding a recipe by id
    if (!recipeById) {
      return res.status(404).send("Recipe is not found");
    }
    res.status(200).json({
      message: "Recipe Found successfully",
      recipe: recipeById,
    });
    console.log("Recipes is found by ID");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retreving recipes by id");
  }
};

//Function to create a new recipes
// req - The request object param.
// res - The response object param.
// Returns success message on recipe creation or an error message.

exports.createNewrecipes = async (req, res) => {
  try {
    const createRecipes = new Recipe(req.body); // creating a new recipe
    await createRecipes.save();
    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: createRecipes });
    console.log("recipe successfully created");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error creating recipe");
  }
};

//Function to update a existing recipe
// req - The request object param.
// res - The response object param.
// Returns success message on updating recipe by id or an error message.

exports.updateRecipe = async (req, res) => {
  try {
    const updateRecipe = await Recipe.findByIdAndUpdate(
      //finding by id to update
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateRecipe) {
      return res.status(404).send("Recipes is not Update and has a error");
    }
    res
      .status(201)
      .json({ message: "Recipe Updated successfully", recipe: updateRecipe });
    console.log("Recipe is updated", updateRecipe);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error updating recipe");
  }
};

//Function to delete a existing recipe
// req - The request object param.
// res - The response object param.
// Returns success message on delete recipe by id or an error message.

exports.deleteRecipe = async (req, res) => {
  try {
    const deleteRecipes = await Recipe.findByIdAndDelete(req.params.id); // finding by id to delete
    if (!deleteRecipes) {
      return res.status(404).send("Recipe is not deleted");
    }
    res
      .status(201)
      .json({ message: "Recipe Deleted successfully", recipe: deleteRecipes });
    console.log("Recipe is deleted", deleteRecipes);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting a recipe");
  }
};
