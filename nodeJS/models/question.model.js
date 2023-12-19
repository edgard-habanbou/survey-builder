const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  },
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answers: {
    type: Array,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
