const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

// Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Group = require("../../models/Group");
const Feedback = require("../../models/Feedback");

/**
 * @route   GET api/profile/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   POST api/profile
 * @desc    Create or update user profile
 * @access  Private
 */
router.post("/", [auth], async (req, res) => {
  // Destructure properties from req
  const {
    major,
    minor,
    phone,
    categoriesHave,
    categoriesWant,
    bio,
    time,
    extendedBio,
    coreValues,
    projects
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (major) profileFields.major = major.split(",").map(maj => maj.trim());
  if (minor) profileFields.minor = minor.split(",").map(min => min.trim());
  if (phone) profileFields.phone = phone;
  if (categoriesHave)
    profileFields.categoriesHave = categoriesHave
      .split(",")
      .map(cH => cH.trim());
  if (categoriesWant)
    profileFields.categoriesWant = categoriesWant
      .split(",")
      .map(cW => cW.trim());
  if (bio) profileFields.bio = bio;
  if (time) profileFields.time = time;
  if (extendedBio) profileFields.extendedBio = extendedBio;
  if (coreValues)
    profileFields.coreValues = coreValues.split(",").map(cv => cv.trim());
  if (projects) profileFields.projects = projects.split(",").map(p => p.trim());

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
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
