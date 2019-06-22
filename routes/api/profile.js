const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

// Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

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
router.post(
  "/", 
  [
    auth,
    [
      // TODO: this might need to be changed for arrays
      check('major', 'Major is required').not().isEmpty(),
      check('bio', 'Bio is required').not().isEmpty()
    ]
  ], 
  async (req, res) => {
    // Go through validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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

      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
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
router.get("user/:user_id", async (req, res) => {
  try {
    const profile = Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   DELETE api/profile/
 * @desc    Delete profile and user
 * @access  Private
 */
router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
