const express = require("express");
const router = express.Router();
const moduleViewController = require("../controllers/moduleViewController");
// middleware that is specific to this router

router.get("/", moduleViewController.index);
router.get("/:id", moduleViewController.show);
router.post("/", moduleViewController.store);
router.put("/:id", moduleViewController.update);
router.delete("/", moduleViewController.destroy);

module.exports = router;
