const userAnswer = require("../models/user_answer.model");
const UserFinishedSurvey = require("../models/user_finished_survey.model");

const addAnswers = async (req, res) => {
  if (!req.user.admin) {
    const { answers, surveyId } = req.body;
    const userId = req.user._id;

    answers.map(async (answer) => {
      const questionId = answer.questionId;
      let ans = answer.answers;

      if (!Array.isArray(ans)) {
        ans = [ans];
      }

      await userAnswer.create({
        questionId: questionId,
        answer: ans,
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
