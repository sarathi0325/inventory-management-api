const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

router.post("/", upload.single("file"), (req, res) => {
  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file
  });
});

module.exports = router;