const mongoose = require("mongoose");

const MatchInfoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  times: {
    type: [String]
  }, 
  activities: {
    type: [String]
  }, 
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = MatchInfo = mongoose.model("match_info", MatchInfoSchema);
