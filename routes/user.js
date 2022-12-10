const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// middleware that is specific to this router

router.get("/", userController.index);
router.get("/:id", userController.show);
router.post("/", userController.store);
router.put("/:id", userController.update);
router.delete("/", userController.destroy);

module.exports = router;
