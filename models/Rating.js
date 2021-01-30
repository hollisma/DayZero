const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
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
  emoji: {
    type: String
  }
});

module.exports = Rating = mongoose.model("rating", RatingSchema);
