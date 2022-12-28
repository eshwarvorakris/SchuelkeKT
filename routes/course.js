const express = require("express");
const router = express.Router();
const courceController = require("../controllers/courceController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.get("/", courceController.index);
router.get("/:id", courceController.show);
router.post("/", verifyAuth.verifyTrainer, courceController.store);
router.put("/:id", courceController.update);
router.delete("/:id", courceController.destroy);

module.exports = router;
