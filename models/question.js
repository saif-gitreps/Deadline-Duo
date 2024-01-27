require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI);


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
