const express = require("express");
const router = express.Router();

const {
  addQuestionAnswer,
  deleteQuestionAnswer,
  updateQuestionAnswer,
} = require("../controllers/question_answer.controllers");

router.post("/", addQuestionAnswer);
router.delete("/:id", deleteQuestionAnswer);
router.put("/:id", updateQuestionAnswer);

module.exports = router;
