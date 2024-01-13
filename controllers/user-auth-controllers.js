// Description: This file contains the controllers for user authentication.
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

async function submitLogin(req, res, next) {
   const email = req.body.email;
   const password = req.body.password;

   let existingUser;
   try {
      existingUser = await User.findOne({ email: email });
      if (!existingUser) {
         req.session.inputData = {
            message: "Could not log you in! please check your credentials!",
            hasError: true,
            email: email,
            password: password,
         };
         req.session.save(function () {
            res.redirect("/");
         });
         return;
      }
      const comparePassword = await bcrypt.compare(password, existingUser.password);
      if (!comparePassword) {
         req.session.inputData = {
            message: "Could not log you in! please check your credentials!",
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
         res.redirect("/deadline");
      });
      return;
   } catch (error) {
      console.log(error);
      next(error);
      return res.redirect("/");
   }
}

async function submitSignUp(req, res, next) {
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
      next(error);
      return res.redirect("/signup");
   }
}

function logout(req, res) {
   req.session.isAuthenticated = false;
   req.session.user = null;
   req.session.save(function () {
      res.redirect("/");
   });
   return;
}

module.exports = {
   getLogin: getLogin,
   getSignUp: getSignUp,
   submitLogin: submitLogin,
   submitSignUp: submitSignUp,
   logout: logout,
};
