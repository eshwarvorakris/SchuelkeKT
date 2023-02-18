const express = require("express");
const router = express.Router();
const courceViewController = require("../controllers/courceViewController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.post("/get_any_course_chapter_viewed", verifyAuth.verifyUser, courceViewController.getAnyCourseChapterViewed);
router.post("/get_chapter_view", verifyAuth.verifyUser, courceViewController.getChapterView);
router.post("/get_module_view", verifyAuth.verifyUser, courceViewController.getModuleView);
router.post("/get_recent_learn", verifyAuth.verifyUser, courceViewController.getRecentLearning);
router.post("/get_course_view_data", verifyAuth.verifyUser, courceViewController.getCourseViewData);
router.post("/get_course_stat", verifyAuth.verifyUser, courceViewController.getEachCourseStat);
router.get("/", courceViewController.index);
router.get("/:id", courceViewController.show);
router.post("/", verifyAuth.verifyUser, courceViewController.store);
router.put("/:id", courceViewController.update);
router.delete("/", courceViewController.destroy);

module.exports = router;
