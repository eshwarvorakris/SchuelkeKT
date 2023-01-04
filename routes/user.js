const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.get("/", verifyAuth.verifyAdmin, userController.index);
router.get("/userNextId", verifyAuth.verifyAdmin, userController.getNexUserId);
router.post("/addUser", verifyAuth.verifyAdmin, userController.addUser);
router.get("/getTrainee", verifyAuth.verifyAdminTrainer, userController.getTrainee);
router.get("/getTrainer", verifyAuth.verifyAdmin, userController.getTrainer);
router.get("/:id", userController.show);
router.post("/", userController.store);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

router.put("/", verifyAuth.verifyUser, userController.updateProfile);

module.exports = router;
