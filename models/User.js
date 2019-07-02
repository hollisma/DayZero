const mongoose = require("mongoose");
import { GUEST } from "./userTypes";

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
  phone_number: {
    type: String
  },
  password: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    default: GUEST
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
    ref: "group",
    default: null
  }
});

module.exports = User = mongoose.model("user", UserSchema);
