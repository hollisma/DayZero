const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

// Models
const Profile = require("../../models/Profile");
const Schedule = require("../../models/Schedule");
const User = require("../../models/User");
const { PROFILED } = require("../../models/types");

/**
 * @route   GET api/profile/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "email", "phone_number"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   POST api/profile
 * @desc    Create or update user profile
 * @access  Private
 */
router.post(
  "/",
  [
    auth,
    [
      // TODO: this might need to be changed for arrays
      check("college", "College is required")
        .not()
        .isEmpty(),
      check("major", "Major is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Go through validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure properties from req
    const { college, major, minor, categories, bio, want_to_meet } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.college = college || null;
    profileFields.major = major ? major.split(",").map(maj => maj.trim()) : [];
    profileFields.minor = minor ? minor.split(",").map(min => min.trim()) : [];
    profileFields.categories = categories || [];
    profileFields.bio = bio || null;
    profileFields.want_to_meet = want_to_meet || null;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();

      // Set user type to PROFILED
      await User.findByIdAndUpdate(req.user.id, {
        $set: { user_type: PROFILED }
      });

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   GET api/profile
 * @desc    Get all profiles
 * @access  Public
 * */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "email",
      "phone_number"
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET api/profile/user/:user_id
 * @desc    Get profile by user ID
 * @access  Public
 */
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "email", "phone_number"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * @route   DELETE api/profile/
 * @desc    Delete profile and user
 * @access  Private
 */
/** @TODO use DELETED user_type to keep info stored */
router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    // Remove schedule
    await Schedule.findOneAndRemove({ user: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
