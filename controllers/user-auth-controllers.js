const db = require("../data/database");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const validateSignUp = require("../util/register-validation");

function getLogin(req, res) {
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
      csrfToken: req.csrfToken(),
   });
}

function getSignUp(req, res) {
   let sessionInputData = req.session.inputData;

   if (!sessionInputData) {
      sessionInputData = {
         hasError: false,
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
      };
   }
   req.session.inputData = null;

   res.render("register", { inputData: sessionInputData, csrfToken: req.csrfToken() });
}

async function submitLogin(req, res) {
   const email = req.body.email;
   const password = req.body.password;

   let existingUser;
   try {
      existingUser = await db.getDb().collection("users").findOne({ email: email });
   } catch (error) {
      return res.send("Error: " + error);
   }
   if (!existingUser) {
      req.session.inputData = {
         message: "Could not log you in ! please check your credentials!",
         hasError: true,
         email: email,
         password: password,
      };
      req.session.save(function () {
         res.redirect("/login");
         return;
      });
   }
   const comparePassword = await bcrypt.compare(password, existingUser.password);
   if (!comparePassword) {
      req.session.inputData = {
         message: "Could not log you in ! please check your credentials!",
         hasError: true,
         email: email,
         password: password,
      };
      req.session.save(function () {
         res.redirect("/");
      });
      return;
   }
   req.session.user = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
   };
   req.session.isAuthenticated = true;

   req.session.save(function () {
      return res.redirect("/deadline");
   });
}

async function submitSignUp(req, res) {
   const submitDetails = { ...req.body };

   if (
      !validateSignUp(
         submitDetails.name,
         submitDetails.email,
         submitDetails.password,
         submitDetails.confirmpassword
      )
   ) {
      req.session.inputData = {
         message: "Invalid input! Please enter valid credentials",
         hasError: true,
         name: submitDetails.name,
         email: submitDetails.email,
      };
      req.session.save(function () {
         res.redirect("/signup");
      });
      return;
   }
   try {
      const existingUser = await User.findOne({ email: submitDetails.email });

      if (existingUser) {
         req.session.inputData = {
            message: "Account already exists! Please login",
            hasError: true,
            name: submitDetails.name,
            email: submitDetails.email,
         };
         req.session.save(function () {
            res.redirect("/signup");
         });
         return;
      }
      const hashedPassword = await bcrypt.hash(submitDetails.password, 12);
      const user = new User({
         name: submitDetails.name,
         email: submitDetails.email,
         password: hashedPassword,
         joindate: new Date(),
      });
      await user.save();
      return res.redirect("/");
   } catch (error) {
      console.log(error);
      return res.redirect("/signup");
   }
}
module.exports = {
   getLogin: getLogin,
   getSignUp: getSignUp,
   submitLogin: submitLogin,
   submitSignUp: submitSignUp,
};
