// File Name - passportConfig.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 18th October 2024

//Importing
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const express = require("express");
const LocalStrategy = require("passport-local").Strategy;

// Local statergy configuration for username/password login
passport.use(
  new LocalStrategy(
    { userField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        // Validating if the user exists
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Incorrect Username" });
        }
        //Validating if the password matches
        const isPassword = await bcrypt.compare(password, user.passport);
        if (!isPassword) {
          return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  )
);

//Serialize and Deserialize user for session support
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findByID(id)
    .then((user) => done(null, user))
    .catch((e) => done(e, null));
});
