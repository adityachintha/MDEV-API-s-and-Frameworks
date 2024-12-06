// File Name - userModel.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Date - 12 November 2024

//Import modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Schema for Users
const UserSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
});

// Middleware for encrypting password before saving user information in collections
UserSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

//method for Validating the password
UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password,this.password);
};

const User = mongoose.model("User", UserSchema);

//Export
module.exports = User;
