const express = require("express");
const router = express.Router();
const widgetController = require("../controllers/widgetController");
// middleware that is specific to this router

router.get("/course/:type", widgetController.course);
router.get("/module/:type", widgetController.module);

module.exports = router;
