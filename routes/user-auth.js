const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const protectRoute = require("../middlewares/route-protection-middleware");

router.get("/", function (req, res) {
   res.render("login");
});
