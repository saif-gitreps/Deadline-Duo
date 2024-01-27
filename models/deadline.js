require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const DBS_NAME = process.env.DBS_NAME;
// connecting raw mongoose like this is bad practise
// so we will wrap this around async await.

(async () => {
   try {
      await mongoose.connect(`${mongoURI}/${DBS_NAME}`);
   } catch (error) {
      console.log("DB ERRO :" + error);
      throw error;
   }
})();

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
