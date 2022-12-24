const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
// middleware that is specific to this router

router.get("/", questionController.index);
router.get("/:id", questionController.show);
router.post("/", questionController.store);
router.put("/:id", questionController.update);
router.delete("/", questionController.destroy);

module.exports = router;
