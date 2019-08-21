const config = require("config");
const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const { REGISTERED } = require("../models/types");

const User = require("../models/User");

module.exports = function() {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.get("googleAuth").clientID,
        clientSecret: config.get("googleAuth").clientSecret
      },
      (accessToken, refreshToken, profile, done) =>
        User.findOne(
          {
            "googleProvider.id": profile.id
          },
          (err, user) => {
            if (!user) {
              let newUser = new User({
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
                return done(error, savedUser);
              });
            } else {
              return done(err, user);
            }
          }
        )
    )
  );
};
