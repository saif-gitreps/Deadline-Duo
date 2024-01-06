const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const protectRoute = require("../middlewares/route-protection-middleware");

router.get("/", function (req, res) {
   let sessionInputData = req.session.inputData;

   if (!sessionInputData) {
      sessionInputData = {
         hasError: false,
         email: "",
         password: "",
      };
   }
   req.session.inputData = null;
   res.render("login", {
      inputData: sessionInputData,
   });
});

module.exports = router;
