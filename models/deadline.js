require("dotenv").config();
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const mongoURI = process.env.LOCAL_URI;
const User = require("./user");
mongoose.connect(mongoURI);

const deadlineSchema = new mongoose.Schema(
   {
      title: String,
      dueDate: Date,
      timeLeft: String,
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   {
      timestamps: true,
   }
);

const Deadline = mongoose.model("Deadline", deadlineSchema);

module.exports = Deadline;
