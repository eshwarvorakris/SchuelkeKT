const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");
// middleware that is specific to this router

router.get("/", moduleController.index);
router.get("/:id", moduleController.show);
router.post("/", moduleController.store);
router.put("/:id", moduleController.update);
router.delete("/", moduleController.destroy);

module.exports = router;
