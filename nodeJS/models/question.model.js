const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
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
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
