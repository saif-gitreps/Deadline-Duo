const express = require("express");
const protectRoute = require("../middlewares/route-protection-middleware");
const questionController = require("../controllers/question-controller");
const router = express.Router();

router.use(protectRoute);

router.get("/question", questionController.getQuestionPage);

router.post("/question", questionController.submitQuestion);

router.post("/question/:id/delete", questionController.deleteQuestion);

router.get("/question/:id/edit", questionController.editQuestionPage);

router.post("/question/:id/edit", questionController.submitQuestionEdit);

module.exports = router;
