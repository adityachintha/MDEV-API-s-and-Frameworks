// File Name - userRoutes.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

//Import
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userController = require("../controllers/authController");

//Route to Register the User
router.post("/register", userController.registerUser);

//Route to login the User
router.get("/login", userController.loginUser);

//Route to logout the user
router.get("/logout", userController.logoutUser);

//Export
module.exports = router;
