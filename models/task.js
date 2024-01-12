require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.LOCAL_URI;
mongoose.connect("mongodb://localhost:27017/deadline-duo");

const taskSchema = new mongoose.Schema(
   {
      title: String,
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   {
      timestamps: true,
   }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
