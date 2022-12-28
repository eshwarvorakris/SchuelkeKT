const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.get("/", verifyAuth.verifyAdmin, userController.index);
router.get("/getTrainee", verifyAuth.verifyAdminTrainer, userController.getTrainee);
router.get("/getTrainer", verifyAuth.verifyAdmin, userController.getTrainer);
router.get("/:id", userController.show);
router.post("/", userController.store);
router.put("/:id", userController.update);
router.delete("/", userController.destroy);

module.exports = router;
