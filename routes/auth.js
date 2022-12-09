const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// middleware that is specific to this router

router.post("/login",authController.login);
router.post("/registration",authController.registration);

module.exports = router;
