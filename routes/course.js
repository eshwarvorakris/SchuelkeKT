const express = require("express");
const router = express.Router();
const courceController = require("../controllers/courceController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.get("/", verifyAuth.verifyUser, courceController.index);
router.get("/:id/module", courceController.modules);
router.get("/:id", courceController.show);
router.post("/", verifyAuth.verifyTrainer, courceController.store);
router.put("/:id", courceController.update);
router.delete("/:id", courceController.destroy);
router.post("/course_analytics", courceController.courseAnalytics);
router.post("/trainee_assigned_courses", verifyAuth.verifyUser, courceController.assignedTraineeCourses);

module.exports = router;
