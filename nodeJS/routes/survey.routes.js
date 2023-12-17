const express = require("express");
const router = express.Router();
const {
  addSurvey,
  deleteSurvey,
  updateSurvey,
  getAllSurveys,
  getSurveyById,
} = require("../controllers/survey.controllers");

router.post("/", addSurvey);
router.delete("/:id", deleteSurvey);
router.put("/:id", updateSurvey);
router.get("/", getAllSurveys);
router.get("/:id", getSurveyById);

module.exports = router;
