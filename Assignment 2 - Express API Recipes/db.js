// File Name - db.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 11 October 2024

// Import

const { default: mongoose } = require("mongoose");
const databaseUrl = process.env.MONGOURI;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Initiate the Server
const mongoServer = async () => {
  try {
    await mongoose.connect(databaseUrl);
    console.log("Connected to Database");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// Export the modules
module.exports = mongoServer;
