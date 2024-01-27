const Deadline = require("../models/deadline");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const calculateDaysLeft = require("../util/days-difference-calculator");
const calculateHoursLeft = require("../util/hour-difference-calculator");
const setColor = require("../util/set-card-colour");

async function getDeadlinePage(req, res, next) {
   const deadlineError = req.session.deadlineError;
   const deadlineErrorMessge = req.session.deadlineErrorMessge;
   const csrfToken = req.csrfToken();
   try {
      const deadlines = await Deadline.find({ userId: req.session.user._id })
         .sort({ dueDate: 1 })
         .exec();
      req.session.deadlineError = false;
      req.session.deadlineErrorMessge = null;
      for (let deadline of deadlines) {
         if (!deadline.dueDate) {
            deadline.dueDate = new Date("1969-01-01");
            continue;
         }
         const daysDiff = calculateDaysLeft(deadline.dueDate);
         const hoursDiff = calculateHoursLeft(deadline.dueDate);
         deadline.color = setColor(daysDiff);
         deadline.timeLeft =
            daysDiff <= 0 && hoursDiff < 0 ? "Time over" : `${daysDiff}d ${hoursDiff}h`;
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

async function deleteDeadline(req, res, next) {
   const deadlineId = new ObjectId(req.params.id);
   try {
      const deadline = await Deadline.findById({ _id: deadlineId });
      if (!deadline) {
         return res.redirect("/500");
      }
      await deadline.deleteOne();
      return res.redirect("/deadline");
   } catch (error) {
      console.log(error);
      next(error);
   }
}

async function editDeadlinePage(req, res, next) {
   const deadlineError = req.session.deadlineError;
   const deadlineErrorMessge = req.session.deadlineErrorMessge;
   const deadlineId = new ObjectId(req.params.id);
   const csrfToken = req.csrfToken();
   try {
      const deadline = await Deadline.findById({ _id: deadlineId });
      if (!deadline) {
         return res.redirect("/500");
      }
      if (!deadline.dueDate) {
         deadline.dueDate = new Date("1969-01-01");
      }
      req.session.deadlineError = false;
      req.session.deadlineErrorMessge = null;
      return res.render("deadline-edit", {
         deadline: deadline,
         csrfToken: csrfToken,
         deadlineError: deadlineError,
         deadlineErrorMessge: deadlineErrorMessge,
      });
   } catch (error) {
      console.log(error);
      next(error);
   }
}

async function submitDeadlineEdit(req, res, next) {
   const title = req.body.title;
   let dueDate = req.body.dueDate;
   const description = req.body.description;
   // one thing i noticed is, it works without new objectId and with , so i ll just keep using it.
   const deadlineId = new ObjectId(req.params.id);
   if (!dueDate) {
      dueDate = req.body.currentDueDate;
   }
   if (!title) {
      req.session.deadlineError = true;
      req.session.deadlineErrorMessge = "Please fill in all fields";
      req.session.save(function () {
         res.redirect(`/deadline/${req.params.id}/edit`);
      });
      return;
   }

   try {
      await Deadline.updateOne(
         { _id: deadlineId },
         {
            $set: {
               title: title,
               dueDate: dueDate,
               description: description,
            },
         }
      );
      return res.redirect("/deadline");
   } catch (error) {
      console.log(error);
      next(error);
   }
}

module.exports = {
   getDeadlinePage: getDeadlinePage,
   submitDeadline: submitDeadline,
   deleteDeadline: deleteDeadline,
   editDeadlinePage: editDeadlinePage,
   submitDeadlineEdit: submitDeadlineEdit,
};
