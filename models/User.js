const mongoose = require("mongoose");
const { GUEST, REGISTERED } = require("./types");

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
  },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
});

UserSchema.set("toJSON", { getters: true, virtuals: true });

UserSchema.statics.upsertGoogleUser = (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  let that = this;
  return this.findOne(
    {
      "googleProvider.id": profile.id
    },
    (err, user) => {
      if (!user) {
        let newUser = new that({
          name: profile.displayName,
          email: profile.emails[0].value,
          user_type: REGISTERED,
          googleProvider: {
            id: profile.id,
            token: accessToken
          }
        });

        newUser.save((error, savedUser) => {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    }
  );
};

module.exports = User = mongoose.model("user", UserSchema);
