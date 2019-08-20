const config = require("config");
const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;

const User = require("../models/User");

module.exports = function() {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.get("googleAuth").clientID,
        clientSecret: config.get("googleAuth").clientSecret
      },
      (accessToken, refreshToken, profile, done) => {
        User.upsertGoogleUser(accessToken, refreshToken, profile, (err, user) =>
          done(err, user)
        );
      }
    )
  );
};
