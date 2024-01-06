require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const database = require("./data/database");
const bcrypt = require("bcrypt");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const csurf = require("tiny-csrf");
const addCSRFtoken = require("./middlewares/CSRF-token-middleware");

const userAuthRoutes = require("./routes/user-auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const MongoDBStore = mongodbStore(session);
const sessionStore = new MongoDBStore({
   uri: process.env.MONGO_URI,
   databaseName: "deadline-duo",
   collection: "sessions",
   cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 4 * 4, // 4 months
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

app.use(userAuthRoutes);

app.listen(3000);
