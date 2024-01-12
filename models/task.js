require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

const taskSchema = new mongoose.Schema(
   {
      title: String,
      priority: Number,
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
