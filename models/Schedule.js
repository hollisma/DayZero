const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  times: {
    type: [String]
  }
});

module.exports = Schedule = mongoose.model("schedule", ScheduleSchema);
