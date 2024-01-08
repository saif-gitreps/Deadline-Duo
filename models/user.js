const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.LOCAL_URI;
mongoose.connect(mongoURI);

const userSchema = new mongoose.Schema(
   {
      name: String,
      email: String,
      password: String,
      joindate: Date,
   },
   {
      timestamps: true,
   }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
