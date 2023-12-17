const Survey = require("../models/survey.model");
const Question = require("../models/question.model");
const QuestionAnswer = require("../models/question_answer.model");
const userAnswer = require("../models/user_answer.model");

const addSurvey = async (req, res) => {
  if (req.user.admin) {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title cannot be empty" });
    }
    Survey.create({ userId: id, title });
    res.status(200).json({ message: "Survey created" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

const deleteSurvey = async (req, res) => {
  if (req.user.admin) {
    const { surveyId } = req.params.surveyId;

    if (!surveyId) {
      return res.status(400).json({ message: "ID not found" });
    }

    const deletedSurvey = await Survey.findByIdAndDelete(surveyId);
    if (deletedSurvey) {
      await Question.deleteMany({
        surveyId: surveyId,
      });
      await QuestionAnswer.deleteMany({
        surveyId: surveyId,
      });
      await userAnswer.deleteMany({
        surveyId: surveyId,
      });
    }

    res.status(200).json({ message: "Survey deleted" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

const updateSurvey = async (req, res) => {
  if (req.user.admin) {
    const { surveyId } = req.params.surveyId;
    const { title } = req.body;

    if (!surveyId) {
      return res.status(400).json({ message: "ID not found" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    const updatedSurvey = await Survey.findByIdAndUpdate(surveyId, {
      title: title,
    });

    if (!updatedSurvey) {
      return res.status(400).json({ message: "Survey not found" });
    }

    res.status(200).json({ message: "Survey updated" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

const getAllSurveys = async (req, res) => {
  const surveys = await Survey.find();
  res.status(200).json({ surveys });
};

const getSurveyById = async (req, res) => {
  const surveyId = req.params.id;
  const survey = await Survey.findById(surveyId);
  const questions = await Question.find({ surveyId });
  const questionAnswers = await QuestionAnswer.find({ surveyId });
  res.status(200).json({ survey, questions, questionAnswers, req });
};

module.exports = {
  addSurvey,
  deleteSurvey,
  updateSurvey,
  getAllSurveys,
  getSurveyById,
};
