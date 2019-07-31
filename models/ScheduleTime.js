const mongoose = require("mongoose");

const ScheduleTimeSchema = new mongoose.Schema({
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schedule"
  },
  date: {
    type: Date,
    required: true
  },
  meal: {
    type: String,
    required: true
  }
});

module.exports = ScheduleTime = mongoose.model(
  "schedule_time",
  ScheduleTimeSchema
);
