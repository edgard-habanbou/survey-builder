const mongoose = require("mongoose");

const serveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Survey = mongoose.model("Survey", serveySchema);

module.exports = Survey;
