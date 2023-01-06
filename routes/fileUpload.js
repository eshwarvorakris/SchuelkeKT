const express = require("express");
const router = express.Router();

const verifyAuth = require("../middleware/authorization");
const fileController = require("../controllers/fileUploadController");
// let multer = require("multer");
// let upload = multer({
//   // storage: multer.memoryStorage(),
//   limits: {
//       fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: function (req, file, done) {
//       if (
//           file.mimetype === "image/jpeg" ||
//           file.mimetype === "image/png" ||
//           file.mimetype === "image/jpg"
//       ) {
//           done(null, true);
//       } else {
//           //prevent the upload
//           var newError = new Error("File type is incorrect");
//           newError.name = "MulterError";
//           done(newError, false);
//       }
//   },
// });

//router.post("/", upload.single("image"), verifyAuth.verifyUser, fileController.uploadFile);
router.post("/", verifyAuth.verifyUser, fileController.uploadFile);

module.exports = router;