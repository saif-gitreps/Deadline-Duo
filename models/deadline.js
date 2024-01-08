const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.LOCAL_URI;
mongoose.connect(mongoURI);

const deadlineSchema = new mongoose.Schema({});
