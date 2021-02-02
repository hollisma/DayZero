const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

const User = require("../../models/User");
const { REGISTERED } = require("../../models/types");
const crypto = require("crypto");
const URLSafeBase64 = require("urlsafe-base64");
const DayZeroGmail = require("../../utils/DayZeroGmail");
require("dotenv").config();

/**
 * @route   POST api/users
 * @desc    Register user
 * @access  Public
 * */
router.post(
  "/",
  [
    // check("name", "Name is required")
    //   .not()
    //   .isEmpty(),
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

    const { email, password } = req.body;

    try {
      // Check if user already exists
      var user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Create user
      user = new User({
        email,
        avatar: "https://i.stack.imgur.com/dr5qp.jpg",
        password,
        user_type: REGISTERED,
        // vibe: {}
        // ---------------------------------------------------------------------------------
        // CHANGE TO TRUE TO AUTOVERIFY USERS
        verified: false
        // ---------------------------------------------------------------------------------
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user.verificationToken = URLSafeBase64.encode(crypto.randomBytes(32));

      // Save to database
      await user.save();

      // ---------------------------------------------------------------------------------
      // COMMENT BELOW TO NOT SEND VERIFICATION EMAIL
      const url =
        process.env.CLIENT_ADDRESS +
        "/verification?token=" +
        user.verificationToken;
      const message =
        "Click the link below to verify your account!\n\n" + url;
      const mail = new DayZeroGmail();
      mail.send(user.email, "Account Verification", message);
      // ---------------------------------------------------------------------------------

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
      avatar
      // phone_number,
      // comm_phone,
      // comm_email
    } = req.body;

    try {
      // Check if user already exists
      var user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User not found" }] });
      }

      user = await User.findOneAndUpdate(
        { email },
        { $set: { name, avatar } },
        // { $set: { name, avatar, phone_number, comm_phone, comm_email } },
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

/**
 * @route   PUT api/users/admin
 * @desc    Update user
 * @access  Public
 * */
router.put("/admin", admin, async (req, res) => {
  const {
    id,
    name,
    email,
    avatar,
    // phone_number,
    // comm_sms,
    // comm_email,
    // vibe,
    user_type,
    group
  } = req.body;
  let { password } = req.body;

  try {
    // Check if user already exists
    var user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }

    if (password) {
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    let newUser = {};
    if (id) newUser.id = id;
    if (name) newUser.name = name;
    if (email) newUser.email = email;
    if (avatar) newUser.avatar = avatar;
    // if (phone_number) newUser.phone_number = phone_number;
    // if (comm_sms) newUser.comm_sms = comm_sms;
    // if (comm_email) newUser.comm_email = comm_email;
    // if (vibe) newUser.vibe = vibe;
    if (user_type) newUser.user_type = user_type;
    if (group) newUser.group = group;
    if (password) newUser.password = password;

    user = await User.findByIdAndUpdate(
      id,
      {
        $set: newUser
      },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   DELETE api/users/:user_id
 * @desc    Delete user and profile/matching info attached to user
 * @access  Admin
 */
router.delete("/admin/:user_id", admin, async (req, res) => {
  try {
    // Remove user
    await User.findOneAndRemove({ _id: req.params.user_id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.params.user_id });
    // Remove matching info
    await MatchInfo.findOneAndRemove({ user: req.params.user_id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   DELETE api/users/danger_zone
 * @desc    Clear all users except admin
 * @access  Admin
 */
router.delete("/danger_zone/admin", admin, async (req, res) => {
  try {
    let data = await User.deleteMany({ user_type: { $ne: 'ADMIN' } })
    console.log(data)

    res.json({ msg: "Poof", data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   put api/users/group/:user_id
 * @desc    Change user_type to GROUPED
 * @access  Admin
 */
router.put("/group/:user_id", admin, async (req, res) => {
  try {
    req.params.user_id

    user = await User.findByIdAndUpdate(req.params.user_id, {
        $set: { user_type: 'GROUPED' }
      }
    );

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
