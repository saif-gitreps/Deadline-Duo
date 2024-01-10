const db = require("../data/database");
const Deadline = require("../models/deadline");

async function getDeadlinePage(req, res) {
   const deadlineError = req.session.deadlineError;
   const deadlineErrorMessge = req.session.deadlineErrorMessge;
   const csrfToken = req.csrfToken();
   try {
      const deadlines = await Deadline.find({ userId: req.session.user._id })
         .sort({ dueDate: 1 })
         .exec();
      req.session.deadlineError = false;
      req.session.deadlineErrorMessge = null;
      for (deadline of deadlines) {
         const startDate = new Date();
         const timeDifference = deadline.dueDate - startDate;
         const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
         const hoursDifference = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
         );
         deadline.timeLeft = `${daysDifference} day(s) ${hoursDifference} hour(s)`;
      }
      res.render("deadline-page", {
         userId: req.session.user._id,
         deadlines: deadlines,
         csrfToken: csrfToken,
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
      return res.redirect("/deadline");
   } catch (error) {
      console.log(error);
      next(error);
   }
}

module.exports = {
   getDeadlinePage: getDeadlinePage,
   submitDeadline: submitDeadline,
};
