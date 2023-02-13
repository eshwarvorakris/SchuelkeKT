const express = require("express");
const router = express.Router();
const attemptController = require("../controllers/questionAttemptController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.get("/", verifyAuth.verifyTrainee, attemptController.traineeAttemptList);
router.post("/traineeAttempts", verifyAuth.verifyAdminTrainer, attemptController.traineeAttempts);
router.get("/getAllUser", verifyAuth.verifyAdminTrainer, attemptController.index);
router.get("/:id", attemptController.show);
router.post("/", verifyAuth.verifyTrainee, attemptController.store);
router.post("/getSubmitted", verifyAuth.verifyTrainee, attemptController.getSubmitted);
router.post("/countAttempt", verifyAuth.verifyTrainee, attemptController.countAttempt);
router.put("/:id", attemptController.update);
router.delete("/", attemptController.destroy);

module.exports = router;
