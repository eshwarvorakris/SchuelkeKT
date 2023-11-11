const express = require("express");
const router = express.Router();
const moduleContentController = require("../controllers/moduleContentController");
// middleware that is specific to this router

router.get("/", moduleContentController.index);
router.get("/:id", moduleContentController.show);
router.post("/", moduleContentController.store);
router.put("/:id", moduleContentController.update);
router.delete("/:id", moduleContentController.destroy);
router.post("/delete-carousel", moduleContentController.deleteCarouselImage);

module.exports = router;
