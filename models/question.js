require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.LOCAL_URI;
mongoose.connect("mongodb://localhost:27017/deadline-duo");

const questionSchema = new mongoose.Schema(
   {
      title: String,
      answer: String,
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   {
      timestamps: true,
   }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
