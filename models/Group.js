const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    // Will depend on if we want empty groups
    require: true
  },
  time: {
    type: Date
  },
  location: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date, 
    default: Date.now
  }
});

module.exports = Group = mongoose.model("group", GroupSchema);
