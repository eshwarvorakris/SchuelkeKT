const express = require("express");
const router = express.Router();
const courseAssignController= require("../controllers/courseAssignController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.get("/", verifyAuth.verifyUser, courseAssignController.index);
router.post("/", verifyAuth.verifyAdminTrainer, courseAssignController.store);
router.delete("/:id", verifyAuth.verifyAdminTrainer, courseAssignController.destroy);

module.exports = router;
