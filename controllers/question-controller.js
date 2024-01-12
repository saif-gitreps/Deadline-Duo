const Question = require("../models/question");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

async function getQuestionPage(req, res) {
   const questionError = req.session.questionError;
   const questionErrorMessge = req.session.questionErrorMessge;
   const csrfToken = req.csrfToken();
   try {
      const questions = await Question.find({ userId: req.session.user._id });
      req.session.questionError = false;
      req.session.questionErrorMessge = null;
      //   for (question of questions) {
      //      const daysDiff = calculateDaysLeft(question.dueDate);
      //      const hoursDiff = calculateHoursLeft(question.dueDate);
      //      question.color = setColor(daysDiff);
      //      question.timeLeft =
      //         daysDiff <= 0 && hoursDiff < 0 ? "Time over" : `${daysDiff}d ${hoursDiff}h`;
      //   }
      res.render("question-page", {
         userId: req.session.user._id,
         questions: questions,
         csrfToken: csrfToken,
         questionError: questionError,
         questionErrorMessge: questionErrorMessge,
      });
      return;
   } catch (error) {
      console.log(error);
      next(error);
      return res.redirect("/500");
   }
}

async function submitQuestion(req, res, next) {
   const userId = req.session.user._id;
   const title = req.body.title;
   const answer = req.body.answer;
   if (!title) {
      req.session.questionError = true;
      req.session.questionErrorMessge = "Please fill in all fields";
      req.session.save(function () {
         res.redirect("/question");
      });
      return;
   }
   try {
      const newQuestion = new Question({
         title: title,
         answer: answer,
         userId: userId,
      });
      await newQuestion.save();
      return res.redirect("/question");
   } catch (error) {
      console.log(error);
      next(error);
   }
}

async function deleteQuestion(req, res, next) {
   const questionId = new ObjectId(req.params.id);
   try {
      const question = await Question.findById({ _id: questionId });
      if (!question) {
         return res.redirect("/500");
      }
      await question.deleteOne();
      return res.redirect("/question");
   } catch (error) {
      console.log(error);
      next(error);
   }
}

async function editQuestionPage(req, res, next) {
   const questionError = req.session.questionError;
   const questionErrorMessge = req.session.questionErrorMessge;
   const questionId = new ObjectId(req.params.id);
   const csrfToken = req.csrfToken();
   try {
      const question = await Question.findById({ _id: questionId });
      if (!question) {
         return res.redirect("/500");
      }
      req.session.questionError = false;
      req.session.questionErrorMessge = null;
      return res.render("question-edit", {
         question: question,
         csrfToken: csrfToken,
         questionError: questionError,
         questionErrorMessge: questionErrorMessge,
      });
   } catch (error) {
      console.log(error);
      next(error);
   }
}

async function submitQuestionEdit(req, res, next) {
   const title = req.body.title;
   const dueDate = req.body.dueDate;
   const description = req.body.description;
   // one thing i noticed is, it works without new objectId and with , so i ll just keep using it.
   const questionId = new ObjectId(req.params.id);

   if (!title || !answer) {
      req.session.questionError = true;
      req.session.questionErrorMessge = "Please fill in all fields";
      req.session.save(function () {
         res.redirect(`/question/${req.params.id}/edit`);
      });
      return;
   }

   try {
      await question.updateOne(
         { _id: questionId },
         {
            $set: {
               title: title,
               dueDate: dueDate,
               description: description,
            },
         }
      );
      return res.redirect("/question");
   } catch (error) {
      console.log(error);
      next(error);
   }
}

module.exports = {
   getQuestionPage: getQuestionPage,
   submitQuestion: submitQuestion,
   deleteQuestion: deleteQuestion,
   editQuestionPage: editQuestionPage,
   submitQuestionEdit: submitQuestionEdit,
};
