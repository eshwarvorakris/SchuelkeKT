const express = require("express");
const router = express.Router();
const courceController = require("../controllers/courceController");
// middleware that is specific to this router

router.get("/", courceController.index);
router.get("/:id", courceController.show);
router.post("/", courceController.store);
router.put("/:id", courceController.update);
router.delete("/:id", courceController.destroy);

module.exports = router;
