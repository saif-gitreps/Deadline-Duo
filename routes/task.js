const express = require("express");
const protectRoute = require("../middlewares/route-protection-middleware");
const taskController = require("../controllers/task-controllers");
const router = express.Router();

router.use(protectRoute);

router.get("/task", taskController.getDeadlinePage);

router.post("/task", taskController.submitDeadline);

router.post("/task/:id/delete", taskController.deleteDeadline);

module.exports = router;
