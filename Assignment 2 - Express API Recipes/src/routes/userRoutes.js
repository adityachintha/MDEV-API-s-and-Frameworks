// File Name - userRoutes.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 12 October 2024

//Import
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userController = require("../controllers/userController");

//Route to register the user
router.post("/register", userController.registerNewUser);

//Export
module.exports = router;