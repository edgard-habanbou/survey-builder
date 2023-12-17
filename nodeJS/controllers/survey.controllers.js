// const { db } = require("../configs/db.configs");

const Survey = require("../models/survey.model");
const Question = require("../models/question.model");
const QuestionAnswer = require("../models/question_answer.model");
const userAnswer = require("../models/user_answer.model");
const jwt = require("jsonwebtoken");

const getUser = (headers) => {
  return new Promise((resolve, reject) => {
    const token = headers.authorization && headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const addSurvey = async (req, res) => {
  const { id, admin } = await getUser(req.headers);
  if (admin) {
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
  const { admin } = await getUser(req.headers);

  if (admin) {
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
  const { admin } = await getUser(req.headers);

  if (admin) {
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
  let verified = false;
  getUser(req.headers)
    .then(() => {
      verified = true;
    })
    .catch((err) => {
      res.status(400).json({ message: "Not Authorized" });
    });

  if (verified) {
    const surveys = await Survey.find();
    res.status(200).json({ surveys });
  }
};

const getSurveyById = async (req, res) => {
  let verified = false;
  getUser(req.headers)
    .then(() => {
      verified = true;
    })
    .catch((err) => {
      res.status(400).json({ message: "Not Authorized" });
    });
  if (verified) {
    const surveyId = req.params.id;
    const survey = await Survey.findById(surveyId);
    const questions = await Question.find({ surveyId });
    const questionAnswers = await QuestionAnswer.find({ surveyId });
    res.status(200).json({ survey, questions, questionAnswers });
  }
};

module.exports = {
  addSurvey,
  deleteSurvey,
  updateSurvey,
  getAllSurveys,
  getSurveyById,
};
