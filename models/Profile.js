const mongoose = require("mongoose");
const SMS = require("./types");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  college: {
    type: String,
    require: true
  },
  major: {
    type: [String],
    require: true
  },
  minor: {
    type: [String]
  },
  categories: {
    type: [String]
  },
  bio: {
    type: String
  },
  values: {
    type: [String]
  },
  times: {
    type: [Date]
  },
  sms: {
    type: Boolean,
    default: true
  },
  email: {
    type: Boolean,
    default: false
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
