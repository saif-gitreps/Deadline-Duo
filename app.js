require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const mongoDbStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const csurf = require("tiny-csrf");
const addCSRFtoken = require("./middlewares/CSRF-token-middleware");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const MongoDBStore = mongoDbStore(session);
const sessionStore = new MongoDBStore({
   uri: process.env.MONGO_URI,
   databaseName: "deadline-duo",
   collection: "sessions",
   cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 4 * 4, // 4 months
      sameSite: lax,
   },
});
app.use(cookieParser("cookie-parser-secret"));

app.use(
   session({
      secret: "super-secret",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
   })
);

app.use(csurf("123456789iamasecret987654321look"));

// might have to remove this and add route proctection for the required routes.
app.use(function (req, res, next) {
   const user = req.session.user;
   const isAuth = req.session.isAuthenticated;

   if (!user || !isAuth) {
      return next();
   }

   res.locals.csrfToken = req.csrfToken();
   res.locals.isAuthenticated = isAuth;
   res.locals.user = user;

   next();
});

app.get("/", (req, res) => {
   res.send("hello");
});

app.listen(3000);
