// File Name - authController.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

const User = require("../models/userModel");

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
