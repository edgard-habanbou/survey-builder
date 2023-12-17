const userAnswer = require("../models/user_answer.model");
const UserFinishedSurvey = require("../models/user_finished_survey.model");

const addAnswers = async (req, res) => {
  if (!req.user.admin) {
    const { answers, surveyId } = req.body;
    const userId = req.user._id;
    answers.map(async (answer) => {
      const questionId = answer.questionId;
      const questionAnswerId = answer.questionAnswerId;

      await userAnswer.create({
        questionId: questionId,
        questionAnswerId: questionAnswerId,
        surveyId: surveyId,
        userId: userId,
      });
    });
    UserFinishedSurvey.create({
      surveyId: surveyId,
      userId: userId,
    });
    res.json({ message: "Answer added successfully" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = { addAnswers };
