const config = require("config");
const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
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
        // TODO: fix here -- when creating a new user, date and group aren't added

        // User.findOne(
        //   {
        //     email: profile.emails[0].value
        //   },
        //   (err, user) => {
        //     if (!user) {
        //       let newUser = new User({
        //         name: profile.displayName,
        //         email: profile.emails[0].value,
        //         user_type: REGISTERED,
        //         googleProvider: {
        //           id: profile.id,
        //           token: accessToken
        //         }
        //       });

        //       newUser.save((error, savedUser) => {
        //         if (error) {
        //           console.log(error);
        //         }
        //         return done(error, savedUser);
        //       });
        //     } else {
        //       return done(err, user);
        //     }
        //   }
        // )
        User.findOneAndUpdate(
          {
            email: profile.emails[0].value
          },
          {
            $set: {
              name: profile.displayName,
              email: profile.emails[0].value,
              googleProvider: {
                id: profile.id,
                token: accessToken
              }
            },
            $setOnInsert: {
              user_type: REGISTERED,
              group: null,
              date: new Date()
            }
          },
          { upsert: true, new: true },
          (err, doc) => {
            if (err) console.log(err);
            return done(err, doc);
          }
        )
    )
  );

  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: config.get("facebookAuth").clientID,
        clientSecret: config.get("facebookAuth").clientSecret
      },
      (accessToken, refreshToken, profile, done) =>
        User.findOneAndUpdate(
          {
            email: profile.emails[0].value
          },
          {
            $set: {
              name: profile.displayName,
              email: profile.emails[0].value,
              facebookProvider: {
                id: profile.id,
                token: accessToken
              }
            },
            $setOnInsert: {
              user_type: REGISTERED,
              group: null,
              date: new Date()
            }
          },
          { upsert: true, new: true },
          (err, doc) => {
            if (err) console.log(err);
            return done(err, doc);
          }
        )
      // User.findOne(
      //   {
      //     email: profile.emails[0].value
      //   },
      //   (err, user) => {
      //     if (!user) {
      //       let newUser = new User({
      //         name: profile.displayName,
      //         email: profile.emails[0].value,
      //         user_type: REGISTERED,
      //         facebookProvider: {
      //           id: profile.id,
      //           token: accessToken
      //         }
      //       });

      //       newUser.save((error, savedUser) => {
      //         if (error) {
      //           console.log(error);
      //         }
      //         return done(error, savedUser);
      //       });
      //     } else {
      //       return done(err, user);
      //     }
      //   }
      // )
    )
  );
};
