const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number
  },
  binary: {
    type: Boolean
  }
});

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
