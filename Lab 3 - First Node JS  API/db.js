//Import
const { default: mongoose } = require("mongoose");
const MONGOURI = process.env.MONGO_URI;

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
