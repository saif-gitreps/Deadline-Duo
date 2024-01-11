const express = require("express");
const protectRoute = require("../middlewares/route-protection-middleware");
const taskController = require("../controllers/task-controllers");
const router = express.Router();

router.use(protectRoute);

router.get("/task", taskController.getTaskPage);

router.post("/task", taskController.submitTask);

router.post("/task/:id/delete", taskController.deleteTask);

module.exports = router;
