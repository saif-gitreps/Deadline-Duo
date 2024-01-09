const db = require("../data/database");
const Deadline = require("../models/deadline");

async function getDeadlinePage(req, res) {
   const deadlineError = req.session.deadlineError;
   const deadlineErrorMessge = req.session.deadlineErrorMessge;
   try {
      const deadlines = await Deadline.find({ userId: req.session.user._id });
      console.log(deadlines);
      req.session.deadlineError = false;
      req.session.deadlineErrorMessge = null;
      res.render("deadline-page", {
         userId: req.session.user._id,
         deadlines: deadlines,
         csrfToken: req.csrfToken(),
         deadlineError: deadlineError,
         deadlineErrorMessge: deadlineErrorMessge,
      });
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
   const description = req.body.description;
   if (!title || !dueDate) {
      req.session.deadlineError = true;
      req.session.deadlineErrorMessge = "Please fill in all fields";
      req.session.save(function () {
         res.redirect("/deadline");
      });
      return;
   }
   try {
      const newDeadline = new Deadline({
         title: title,
         dueDate: dueDate,
         description: description,
         userId: userId,
      });
      await newDeadline.save();
      return res.json({
         message: "Deadline added successfully",
      });
   } catch (error) {
      console.log(error);
      next(error);
   }
}

module.exports = {
   getDeadlinePage: getDeadlinePage,
   submitDeadline: submitDeadline,
};
