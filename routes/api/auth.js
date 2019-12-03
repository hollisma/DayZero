const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const passport = require("passport");
require("../passport")();

const User = require("../../models/User");

/**
 * @route   GET api/auth
 * @desc    Use token to get user
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    // select(-x) returns object without property x
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   POST api/auth
 * @desc    Login user. Return token
 * @access  Public
 * */
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password").exists()
  ],
  async (req, res) => {
    // Go through validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });

      // Check if user registered with facebook or google
      if (!user.password)
        return res.status(400).json({
          errors: [{ msg: "Try logging in with Google or Facebook" }]
        });

      // Check if email matches password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });

      // Return jwt token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route   POST api/auth/google
 * @desc    Authenticate user via google token
 * @access  Public
 */
router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(401, "User Not Authorized");
    }

    const payload = {
      user: {
        id: req.user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    next();
  }
);

/**
 * @route   POST api/auth/facebook
 * @desc    Authenticate user via facebook token
 * @access  Public
 */
router.post(
  "/facebook",
  passport.authenticate("facebook-token", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(401, "User Not Authorized");
    }

    const payload = {
      user: {
        id: req.user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    next();
  }
);

router.post("/verification", async (req, res) => {
  // const { token, id } = req.body;
  const { token } = req.body;
  let user = await User.findOne({ verificationToken: token });

  // if (user._id != id) {
  //   return res.status(400).json({
  //     errors: [{ msg: "Invalid verification token" }]
  //   });
  // }
  if (!user) {
    return res.status(400).json({
      errors: [{ msg: "Invalid verification token" }]
    });
  }
  // if (user.verified) {
  //   return res.status(400).json({
  //     errors: [{ msg: "The user has already been verified" + user }]
  //   });
  // }
  user.verified = true;
  user = await user.save();
  res.json({ user });
});

module.exports = router;
