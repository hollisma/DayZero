const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  group: {
    // Use this to refer to another model
    type: mongoose.Schema.Types.ObjectId,
    ref: "group"
  }
});

module.exports = User = mongoose.model("user", UserSchema);
