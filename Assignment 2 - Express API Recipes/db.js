// Import

const { default: mongoose } = require("mongoose");
const databaseUrl = process.env.MONGOURI;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
