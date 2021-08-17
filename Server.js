const express = require("express");
app = express();
require("dotenv").config();

const port = process.env.PORT;
const connectDB = require("./config/connectDB");
connectDB();

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`server is running  on port : ${port}`);
  }
});

// Require Routes :

const router = require("./routes/contact");
app.use("/api/contacts", router);
