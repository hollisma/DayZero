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
    // Will change if we use Calendly
    type: [String]
  },
  contact: {
    type: String,
    default: SMS
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
