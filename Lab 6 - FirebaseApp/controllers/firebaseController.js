const admin = require("../models/firebaseModel"); // Correctly import admin from firebaseModel.js

// Controller for sign up
const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Saving user data
    const db = admin.database(); // Access the Realtime Database
    await db.ref(`users/${userRecord.uid}`).set({
      email: userRecord.email,
      createdAt: new Date().toISOString(),
    });

    res
      .status(201)
      .json({ message: "User created successfully", uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller for sign-in (get token)
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve user by email
    const user = await admin.auth().getUserByEmail(email);

    // Generate a custom token for the user
    const customToken = await admin.auth().createCustomToken(user.uid);

    res
      .status(200)
      .json({ message: "Signed in successfully", token: customToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Middleware to verify Firebase ID Token
const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const idToken = authHeader.split("Bearer ")[1]; // Extract token from 'Authorization' header

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken); // Verify the ID token
    req.user = decodedToken; // Attach the decoded token to the request object
    next(); // Continue to the protected route handler
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { signUp, signIn, verifyToken };
