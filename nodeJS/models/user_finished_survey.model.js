const mongoose = require("mongoose");

const userFinishedSurveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
});

const userFinishedSurvey = mongoose.model(
  "userFinishedSurvey",
  userFinishedSurveySchema
);

module.exports = userFinishedSurvey;
