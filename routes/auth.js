const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.post("/login",authController.login);
//router.post("/registration",authController.registration);

router.get("/profile", verifyAuth.verifyUser, authController.profile);
router.post("/profile", authController.updateProfile);

router.post("/addTrainer", verifyAuth.verifyAdmin, authController.addTrainer);
router.post("/addTrainee", verifyAuth.verifyAdmin, authController.addTrainee);

module.exports = router;
