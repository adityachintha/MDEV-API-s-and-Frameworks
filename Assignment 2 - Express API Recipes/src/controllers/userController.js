// File Name - userController.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 12 October 2024

//Importing model
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Register a New user
exports.registerNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    //Validate the inputs
    if (!username || !password || !email) {
      return res.status(400).json({ messeage: "all field are required" });
    }
    //Checking if the email is valid
    if (email !== "String" || email.trim() == "") {
      return res
        .status(400)
        .json({ message: "Invalid email address, please re-enter / check" });
    }

    //Checking for existing user
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    //registering a new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error details -", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    //Validating the user information
    if (!username || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    //checking for existing user
    const userExisted = await User.findOne({ username: username });
    if (!userExisted) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    //comparing the entered password with hashed password
    const userMatchedPassword = await bcrypt.compare(
      password,
      userExisted.password
    );
    if (!userMatchedPassword) {
      return res
        .status(400)
        .json({ message: "Password does not match, please try again" });
    }
    //on successfull login
    res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    console.error("Error details -", error);
    return res.status(500).json({ message: "Error Logging user" });
  }
};

//function for logout
exports.logoutUser = async (req, res) => {
  res.status(201).json({ message: "Logout Successful" });
};
