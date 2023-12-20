const express = require("express");
const { upload_image } = require("../controllers/profile.controllers");
const router = express.Router();

router.post("/upload", upload_image);

module.exports = router;
