const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;
(async () => {
   try {
      await mongoose.connect(`${mongoURI}`);
   } catch (error) {
      console.log("DB ERRO :" + error);
      throw error;
   }
})();

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
