const Question = require("../models/question.model");
const QuestionAnswer = require("../models/question_answer.model");
const UserAnswer = require("../models/user_answer.model");

const addQuestion = async (req, res) => {
  if (req.user.admin) {
    const { question, surveyId } = req.body;

    if (!surveyId) {
      return res.status(400).json({ message: "ID not found" });
    }

    if (!question) {
      return res.status(400).json({ message: "Question cannot be empty" });
    }

    await Question.create({ surveyId: surveyId, question: question });
    res.status(200).json({ message: "Question added" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

const deleteQuestion = async (req, res) => {
  if (req.user.admin) {
    const questionId = req.params.id;

    if (!questionId) {
      return res.status(400).json({ message: "ID not found" });
    }

    const deletedQuestion = await Question.findByIdAndDelete(questionId);
    if (deletedQuestion) {
      await QuestionAnswer.deleteMany({
        questionId: questionId,
      });
      await UserAnswer.deleteMany({
        questionId: questionId,
      });
    }

    res.status(200).json({ message: "Question deleted" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

const updateQuestion = async (req, res) => {
  if (req.user.admin) {
    const questionId = req.params.id;
    const { question } = req.body;

    if (!questionId) {
      return res.status(400).json({ message: "ID not found" });
    }

    if (!question) {
      return res.status(400).json({ message: "Question cannot be empty" });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(questionId, {
      question: question,
    });

    if (!updatedQuestion) {
      return res.status(400).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question updated" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = {
  addQuestion,
  deleteQuestion,
  updateQuestion,
};
