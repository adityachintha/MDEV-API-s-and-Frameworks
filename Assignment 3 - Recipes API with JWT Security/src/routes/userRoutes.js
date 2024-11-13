// File Name - userRoutes.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 12 November 2024

//Import
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userController = require("../controllers/userController");

//Route to register the user
router.post("/register", userController.registerNewUser);
router.get("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

//Export
module.exports = router;
