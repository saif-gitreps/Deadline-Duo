require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.LOCAL_URI;
mongoose.connect("mongodb://localhost:27017/deadline-duo");

const deadlineSchema = new mongoose.Schema(
   {
      title: String,
      dueDate: Date,
      description: String,
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
