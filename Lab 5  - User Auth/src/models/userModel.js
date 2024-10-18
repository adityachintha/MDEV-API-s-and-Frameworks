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

//encrypt password before saving the user information in the database
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10); //this will encrypt the 10 times, the more the number and is expensive.
  this.password = await bcrypt.hash(this.password, salt); // this.password will hash the password and saves in this.password
  next();
});
