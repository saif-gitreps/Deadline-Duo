require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const db = require("./data/database");
const mongodbStore = require("connect-mongodb-session");
const cookieParser = require("cookie-parser");
const csurf = require("tiny-csrf");
const authorize = require("./middlewares/authentication-middleware");

const questionRoutes = require("./routes/question");
const userAuthRoutes = require("./routes/user-auth");
const deadlineRoutes = require("./routes/deadline");
const taskRoutes = require("./routes/task");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

const MongoDBStore = mongodbStore(session);

const sessionStore = new MongoDBStore({
   uri: process.env.MONGO_URI,
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

app.get("/about", (req, res) => {
   res.render("about");
});
app.get("/401", (req, res) => {
   res.render("401");
});
app.get("/500", (req, res) => {
   res.render("500");
});
app.use(csurf("123456789iamasecret987654321look"));
app.use(authorize);
app.use(userAuthRoutes);
app.use(deadlineRoutes);
app.use(taskRoutes);
app.use(questionRoutes);

app.use((error, req, res, next) => {
   res.render("500");
});

db.connectToDatabase().then(function () {
   app.listen(3000);
});
