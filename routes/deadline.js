const express = require("express");
const protectRoute = require("../middlewares/route-protection-middleware");
const deadlineController = require("../controllers/deadline-controllers");
const router = express.Router();

router.use(protectRoute);

router.get("/deadline", deadlineController.getDeadlinePage);

module.exports = router;
