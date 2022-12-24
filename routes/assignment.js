const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
// middleware that is specific to this router

router.get("/", assignmentController.index);
router.get("/:id", assignmentController.show);
router.post("/", assignmentController.store);
router.put("/:id", assignmentController.update);
router.delete("/", assignmentController.destroy);

module.exports = router;
