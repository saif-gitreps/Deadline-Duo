const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/user-auth-controllers");

router.get("/", userAuthController.getLogin);

router.get("/signup", userAuthController.getSignUp);

router.post("/login", userAuthController.submitLogin);

router.post("/signup", userAuthController.submitSignUp);

router.post("/logout", userAuthController.logout);

module.exports = router;
