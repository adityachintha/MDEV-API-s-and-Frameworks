// File Name - userController.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 12 October 2024

//Importing model
const User = require("../models/userModel");

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
