const express = require("express");
const router = express.Router();
const widgetController = require("../controllers/widgetController");
// middleware that is specific to this router
const verifyAuth = require("../middleware/authorization");

router.get("/course/:type", verifyAuth.verifyUser, widgetController.course);
router.get("/module/:type", verifyAuth.verifyUser, widgetController.module);
router.get("/trainee/:type", verifyAuth.verifyUser, widgetController.trainee);
router.get("/trainer/:type", verifyAuth.verifyUser, widgetController.trainer);
router.get("/trainee_kpis", verifyAuth.verifyUser, widgetController.traineeKpis);
router.post("/trainee_status_kpis", verifyAuth.verifyUser, widgetController.traineeStatusKpis);

module.exports = router;