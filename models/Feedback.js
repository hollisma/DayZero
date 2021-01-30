const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  feedback: {
    type: String
  },
  emoji: {
    type: Boolean
  }
});

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
