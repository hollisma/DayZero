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
  avatar: {
    type: String
  },
  password: {
    type: String,
    require: true
  },
  phone_number: {
    type: String
  },
  comm_sms: {
    type: Boolean,
    default: true
  },
  comm_email: {
    type: Boolean,
    default: false
  },
  user_type: {
    type: String,
    default: GUEST,
    require
  },
  group: {
    // Use this to refer to another model
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    default: null,
    require
  },
  vibe: {
    type: Map
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
  },
  date: {
    type: Date,
    default: Date.now,
    require
  },
  verificationToken: {
    type: String,
    select: false
  },
  verified: {
    type: Boolean,
    default: false
  }
});

UserSchema.set("toJSON", { getters: true, virtuals: true });

module.exports = User = mongoose.model("user", UserSchema);
