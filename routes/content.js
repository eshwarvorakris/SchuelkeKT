const express = require("express");
const router = express.Router();
const moduleContentController = require("../controllers/moduleContentController");
// middleware that is specific to this router

router.get("/", moduleContentController.index);
router.get("/:id", moduleContentController.show);
router.post("/", moduleContentController.store);
router.put("/:id", moduleContentController.update);
router.delete("/", moduleContentController.destroy);

module.exports = router;
