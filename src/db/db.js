const {  mongoose } = require("mongoose");

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.error("There was an error connecting to the database", error);
  }
};

