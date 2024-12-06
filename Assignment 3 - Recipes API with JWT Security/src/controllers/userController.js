// File Name - userController.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 12 November 2024

//Importing model
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a New user
// req - The request object param.
// res - The response object param.
// Returns success message on user registration or an error message.

exports.registerNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    //Validate the inputs
    if (!username || !password || !email) {
      return res.status(400).json({ messeage: "all field are required" });
    }
    //Checking if the email is valid
    if (typeof email !== "string" || email.trim() == "") {
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

// Function for User login
// req - The request object param.
// res - The response object param.
// Returns success message on login or an error message.

exports.loginUser = async (req, res) => {
  const { password, email } = req.body;
  console.log("Received Login Request:", req.body); // Log the incoming payload
  try {
    //Validating the user information
    if (!email || !password) {
      console.log("Missing Fields:", { email, password });
      return res.status(401).json({ message: "All fields are required" });
    }

    //checking for existing user
    const userExisted = await User.findOne({ email });
    if (!userExisted) {
      console.log("User not found for email:", email);
      return res.status(400).json({ message: "Invalid username or password" });
    }
    //comparing the entered password with hashed password
    const userMatchedPassword = await bcrypt.compare(
      password,
      userExisted.password
    );
    console.log("Password comparison result:", userMatchedPassword);
    if (!userMatchedPassword) {
      return res
        .status(400)
        .json({ message: "Password does not match, please try again" });
    }
    //Create token for the user
    const token = jwt.sign(
      { user_id: userExisted._id, email },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "15m",
      }
    );

    //on successfull login
    res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    console.error("Error details -", error);
    return res.status(500).json({ message: "Error Logging user" });
  }
};

//function for logout
// req - The request object param.
// res - The response object param.
// Returns success message on logout or an error message.

exports.logoutUser = async (req, res) => {
  res.status(201).json({ message: "Logout Successful" });
};
