// File Name - recipeModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 09/28/2024

//import recipe model, fs and path

const Recipe = require("../models/recipeModel");
const fs = require("fs");
const path = require("path");

const addRecipesList = async (res, req) => {
  try {
    // load the json file
    const jsonFile = path.join(_dirname, "./recipes_list.json");
    const data = fs.readFilesync(jsonFile, "utf-8");
  } catch (error) {}
};
