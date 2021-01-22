const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  college: {
    type: String,
    require: true
  },
  year: {
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
  want_to_meet: {
    type: String
  },
  // liked_users: {
  //   type: [String],
  //   default: []
  // }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
