const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  major: {
    type: [String],
    require: true
  },
  minor: {
    type: [String]
  },
  phone: {
    type: String
  },
  categoriesHave: {
    type: [String]
  },
  categoriesWant: {
    type: [String]
  },
  bio: {
    type: String,
    require: true
  },
  time: {
    // Will change if we use Calendly
    type: String
  },
  extendedBio: {
    type: String
  },
  coreValues: {
    type: [String]
  },
  projects: {
    type: [String]
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
