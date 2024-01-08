const db = require("../data/database");
const Deadline = require("../models/deadline");

async function getDeadlinePage(req, res) {
   const userId = req.session.user._id;
   try {
      const deadlines = await Deadline.find({ userId: userId });
      res.render("deadline-page", { deadlines: deadlines, csrfToken: req.csrfToken() });
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
   console.log(dueDate);
}

module.exports = {
   getDeadlinePage: getDeadlinePage,
   submitDeadline: submitDeadline,
};
