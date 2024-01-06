const mongoose = require("mongoose");

// first object is datatype
// second is timestamp which says when the data was created or updated

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
