const { default: mongoose } = require("mongoose");

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
