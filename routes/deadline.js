const express = require("express");
const protectRoute = require("../middlewares/route-protection-middleware");
const deadlineController = require("../controllers/deadline-controllers");
const router = express.Router();

router.use(protectRoute);

router.get("/deadline", deadlineController.getDeadlinePage);

router.post("/deadline", deadlineController.submitDeadline);

router.post("/deadline/:id/delete", deadlineController.deleteDeadline);

module.exports = router;
