const Question = require("../models/question.model");
const UserAnswer = require("../models/user_answer.model");

const addQuestion = async (req, res) => {
  if (req.user.admin) {
    const { question, surveyId, typeId, answers } = req.body;

    if (!surveyId) {
      return res.status(400).json({ message: "ID not found" });
    }

    if (!question) {
      return res.status(400).json({ message: "Question cannot be empty" });
    }

    const quest = await Question.create({
      surveyId,
      question,
      typeId,
      answers,
    });
    res.status(200).json({ message: "Question added", questionId: quest._id });
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
    const { question, typeId, answers } = req.body;

    if (!questionId) {
      return res.status(400).json({ message: "ID not found" });
    }

    if (!question) {
      return res.status(400).json({ message: "Question cannot be empty" });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(questionId, {
      question: question,
      typeId: typeId,
      answers: answers,
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
