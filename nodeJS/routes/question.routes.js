const express = require("express");
const router = express.Router();

const {
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/question.controllers");

router.post("/", addQuestion);
router.delete("/:id", deleteQuestion);
router.put("/:id", updateQuestion);

module.exports = router;
