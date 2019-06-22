const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true
  },
  Group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group"
  },
  date: {
    type: Date,
    default: Date.now
  },
  q1: {
    type: String
  },
  q2: {
    type: String
  },
  q3: {
    type: String
  }
});

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
