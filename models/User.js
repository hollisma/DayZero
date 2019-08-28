const mongoose = require("mongoose");
const { GUEST } = require("./types");

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
  user_type: {
    type: String,
    default: GUEST,
    require
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
    require
  },
  group: {
    // Use this to refer to another model
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    default: null,
    require
  },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  },
  facebookProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
});

UserSchema.set("toJSON", { getters: true, virtuals: true });

module.exports = User = mongoose.model("user", UserSchema);
