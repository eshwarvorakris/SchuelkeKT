const express = require("express");
const router = express.Router();
const courceViewController = require("../controllers/courceViewController");
// middleware that is specific to this router

router.get("/", courceViewController.index);
router.get("/:id", courceViewController.show);
router.post("/", courceViewController.store);
router.put("/:id", courceViewController.update);
router.delete("/", courceViewController.destroy);

module.exports = router;
