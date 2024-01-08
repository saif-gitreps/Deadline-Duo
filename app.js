require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const db = require("./data/database");
const mongodbStore = require("connect-mongodb-session");
const cookieParser = require("cookie-parser");
const csurf = require("tiny-csrf");
const authorize = require("./middlewares/authentication-middleware");

const userAuthRoutes = require("./routes/user-auth");
const deadlineRoutes = require("./routes/deadline");
const { env } = require("process");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const MongoDBStore = mongodbStore(session);

const sessionStore = new MongoDBStore({
   uri: "mongodb://localhost:27017",
   databaseName: "deadline-duo",
   collection: "sessions",
});

app.use(cookieParser("cookie-parser-secret"));

app.use(
   session({
      secret: "super-secret",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
         maxAge: 1000 * 60 * 60 * 24 * 7 * 4 * 4, // 4 months
      },
   })
);

app.use(csurf("123456789iamasecret987654321look"));


app.use(authorize);

app.use(userAuthRoutes);
app.use(deadlineRoutes);

app.get("/403", (req, res) => {
   //for unauthorized access
   res.status(403).render("403");
});

app.get("/404", (req, res) => {
   //for invalid route
   res.render("404");
});

app.get("/401", (req, res) => {
   //for invalid credentials
   res.status(401).render("401");
});

db.connectToDatabase().then(function () {
   app.listen(3000);
});
