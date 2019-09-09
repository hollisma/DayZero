const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Schedule = require("../../models/Schedule");
const { REGISTERED } = require("../../models/types");

/**
 * @route   POST api/users
 * @desc    Register user
 * @access  Public
 * */
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // Go through validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      var user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // // Get Gravatar profile
      // const avatar = gravatar.url(email, {
      //   s: "200", // size
      //   r: "pg", // rating
      //   d: "mm"
      // });

      // Create user
      user = new User({
        name,
        email,
        avatar: "https://i.stack.imgur.com/dr5qp.jpg",
        password,
        user_type: REGISTERED
        // avatar
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save to database
      await user.save();

      // Return jwt
      const payload = {
        user: {
          id: user.id
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
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route   PUT api/users
 * @desc    Update user
 * @access  Public
 * */
router.put(
  "/",
  auth,
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // Go through validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      avatar,
      phone_number,
      comm_phone,
      comm_email
    } = req.body;

    try {
      // Check if user already exists
      var user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User not found" }] });
      }

      user = await User.findOneAndUpdate(
        { email },
        { $set: { name, avatar, phone_number, comm_phone, comm_email } },
        { new: true }
      );

      return res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route   GET api/users/admin
 * @desc    Get all users
 * @access  Admin
 * */
router.get("/admin", admin, async (req, res) => {
  try {
    let users = await User.find().select("-avatar");
    // let getUsers = users.map(async u => {
    //   u.profile = await Profile.findOne({ user: u.id });
    //   u.schedule = await Schedule.findOne({ user: u.id });
    //   console.log(u);
    //   return u;
    // });

    // const response = await Promise.all(getUsers);

    // for (let u of users) {
    //   u.profile = await Profile.findOne({ user: u.id });
    //   u.schedule = await Schedule.findOne({ user: u.id });
    // }

    // console.log("big poopy butt");
    // console.log(response);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
