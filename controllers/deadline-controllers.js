const db = require("../data/database");
const Deadline = require("../models/deadline");

async function getDeadlinePage(req, res) {
   const userId = req.session.user._id;
   try {
      const deadlines = await Deadline.find({ userId: userId });
      res.render("deadline-page", {
         deadlines: deadlines,
         csrfToken: req.csrfToken(),
         deadlineErrorMessge: req.session.deadlineErrorMessge,
      });
      req.session.deadlineErrorMessge = null;
      return;
   } catch (error) {
      console.log(error);
      next(error);
      return res.redirect("/500");
   }
}

async function submitDeadline(req, res, next) {
   const userId = req.session.user._id;
   const title = req.body.title;
   const dueDate = req.body.dueDate;
   if (!title || !dueDate) {
      req.session.deadlineErrorMessge = "Please fill in all fields";
      req.session.save(function () {
         res.redirect("/deadline");
      });
      return;
   }
}

module.exports = {
   getDeadlinePage: getDeadlinePage,
   submitDeadline: submitDeadline,
};
