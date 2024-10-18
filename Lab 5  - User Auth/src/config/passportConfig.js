// File Name - passportConfig.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

//Importing
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
