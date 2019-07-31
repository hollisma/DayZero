const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  times: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "schedule_time"
  }
});

module.exports = Schedule = mongoose.model("schedule", ScheduleSchema);
