const express = require("express");
const router = express.Router();
const courceViewController = require("../controllers/courceViewController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.post("/get_any_course_chapter_viewed", verifyAuth.verifyTrainee, courceViewController.getAnyCourseChapterViewed);
router.post("/get_chapter_view", verifyAuth.verifyTrainee, courceViewController.getChapterView);
router.post("/get_module_view", verifyAuth.verifyTrainee, courceViewController.getModuleView);
router.get("/", courceViewController.index);
router.get("/:id", courceViewController.show);
router.post("/", verifyAuth.verifyTrainee, courceViewController.store);
router.put("/:id", courceViewController.update);
router.delete("/", courceViewController.destroy);

module.exports = router;
