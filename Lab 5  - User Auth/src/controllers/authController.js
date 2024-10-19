// File Name - authController.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//Function to Register User
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //Validating the user or email or password
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Checking  if email is valid and have any empty spaces
    if (typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({ message: "Invalid email address" });
    }
    //Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered succesfully" });
  } catch (error) {
    console.error("Error details: ", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

//Function to Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Validating the user or email or password
    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    //Checking for existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Imvalid email or password" });
    }
    //Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password does not match" });
    }
    //Succseful login
    res.status(200).json({ message: "Login succesful", userId: user._id });
  } catch (error) {
    console.error("Error details: ", error);
    res.status(500).json({ message: "Error loggin in user" });
  }
};

//Function to Logout User
exports.logoutUser = async (req, res) => {
  res.status(201).json({ message: "logout Successful" });
};
