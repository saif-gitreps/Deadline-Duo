const Task = require("../models/deadline");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

async function getTaskPage(req, res, next) {
   const taskError = req.session.taskError;
   const taskErrorMessge = req.session.taskErrorMessge;
   const csrfToken = req.csrfToken();
   try {
      const tasks = await Task.find({ userId: req.session.user._id });
      req.session.taskError = false;
      req.session.taskErrorMessge = null;

      res.render("task-page", {
         userId: req.session.user._id,
         tasks: tasks,
         csrfToken: csrfToken,
         taskError: taskError,
         taskErrorMessge: taskErrorMessge,
      });
      return;
   } catch (error) {
      console.log(error);
      next(error);
      return res.redirect("/500");
   }
}

async function submitTask(req, res, next) {
   const userId = req.session.user._id;
   const title = req.body.title;
   if (!title) {
      req.session.taskError = true;
      req.session.taskErrorMessge = "Please fill in the title";
      req.session.save(function () {
         res.redirect("/task");
      });
      return;
   }
   try {
      const newTask = new Task({
         title: title,
         userId: userId,
      });
      await newTask.save();
      return res.redirect("/task");
   } catch (error) {
      console.log(error);
      next(error);
   }
}

async function deleteTask(req, res, next) {
   const taskId = new ObjectId(req.params.id);
   try {
      const task = await Task.findById({ _id: taskId });
      if (!task) {
         return res.redirect("/500");
      }
      await task.deleteOne();
      return res.redirect("/task");
   } catch (error) {
      console.log(error);
      next(error);
   }
}

module.exports = {
   getTaskPage: getTaskPage,
   submitTask: submitTask,
   deleteTask: deleteTask,
};
