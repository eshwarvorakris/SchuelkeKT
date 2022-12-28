const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.get("/profile", verifyAuth, authController.profile);
router.post("/login",authController.login);
router.post("/registration",authController.registration);

module.exports = router;
