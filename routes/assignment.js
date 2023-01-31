const express = require("express");
const router = express.Router();
const attemptController = require("../controllers/questionAttemptController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.get("/", attemptController.index);
router.get("/:id", attemptController.show);
router.post("/", verifyAuth.verifyTrainee, attemptController.store);
router.put("/:id", attemptController.update);
router.delete("/", attemptController.destroy);

module.exports = router;
