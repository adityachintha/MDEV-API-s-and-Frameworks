// File Name - db.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

//Import
const { default: mongoose } = require("mongoose");
const MONGOURI = process.env.MONGO_URI;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//Initiating the server
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI);
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

//Export
module.exports = InitiateMongoServer;
