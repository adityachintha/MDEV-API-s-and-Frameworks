// File Name - movieModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

//Import
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//User Schema for Users
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, //Password doesn't require a unique key
});
