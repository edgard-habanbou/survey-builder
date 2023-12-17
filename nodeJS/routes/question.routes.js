const express = require("express");
const router = express.Router();

const {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestionsBySurveyId,
} = require("../controllers/question.controllers");

router.post("/", addQuestion);
router.delete("/:id", deleteQuestion);
router.put("/:id", updateQuestion);
router.get("/:id", getQuestionsBySurveyId);

module.exports = router;
