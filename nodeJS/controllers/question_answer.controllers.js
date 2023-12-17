const QuestionAnswer = require("../models/question_answer.model");

const addQuestionAnswer = async (req, res) => {
  if (req.user.admin) {
    const { questionId, answer, typeId, surveyId } = req.body;

    if (!questionId) {
      return res.status(400).json({ message: "ID not found" });
    }

    if (!answer) {
      return res.status(400).json({ message: "Answer cannot be empty" });
    }

    await QuestionAnswer.create({ questionId, answer, typeId, surveyId });
    res.status(200).json({ message: "Answer added" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

const deleteQuestionAnswer = async (req, res) => {
  if (req.user.admin) {
    const answerId = req.params.id;

    if (!answerId) {
      return res.status(400).json({ message: "ID not found" });
    }

    await QuestionAnswer.findByIdAndDelete(answerId);

    res.status(200).json({ message: "Answer deleted" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

const updateQuestionAnswer = async (req, res) => {
  if (req.user.admin) {
    const answerId = req.params.id;
    const { answer, typeId } = req.body;

    if (!answerId) {
      return res.status(400).json({ message: "ID not found" });
    }

    if (!answer) {
      return res.status(400).json({ message: "Answer cannot be empty" });
    }

    await QuestionAnswer.findByIdAndUpdate(answerId, { answer, typeId });

    res.status(200).json({ message: "Answer updated" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = {
  addQuestionAnswer,
  deleteQuestionAnswer,
  updateQuestionAnswer,
};
