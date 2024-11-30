const admin = require("firebase-admin");

// Firebase Admin SDK service account credentials
const serviceAccount = require("../project-lab6-e6fa6-firebase-adminsdk-y8tm5-e41c71c0ee.json"); // Update the path to your service account file

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  // Prevent reinitialization
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-lab6-e6fa6-default-rtdb.firebaseio.com/", // Replace with your Firebase Realtime Database URL
  });
}

// Export the initialized admin object
module.exports = admin;
