const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
// middleware that is specific to this router

router.get("/", questionController.index);
router.get("/trainee", questionController.indexrandom);
router.get("/:id", questionController.show);
router.post("/", questionController.store);
router.put("/:id", questionController.update);
router.delete("/:id", questionController.destroy);
router.delete("/option/:id", questionController.destroyOption);
router.post("/get-questions-count-by-course", questionController.getQuestionsCountBycourse);

module.exports = router;
