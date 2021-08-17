const mongoose = require("mongoose");

// Connect to database //

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database is connected....");
  } catch (error) {
    console.error("cannot connect to DB");
  }
};

module.exports = connectDB;
