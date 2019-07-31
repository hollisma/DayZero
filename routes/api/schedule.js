const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Models
const Schedule = require("../../models/Schedule");
const User = require("../../models/User");
const { SCHEDULED } = require("../../models/types");

/**
 * @route   GET api/schedule/me
 * @desc    Get current user's schedule
 * @access  Private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!schedule) {
      return res
        .status(400)
        .json({ msg: "There is no schedule for this user" });
    }

    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   POST api/schedule
 * @desc    Create or update user schedule
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  const { times } = req.body;

  try {
    let schedule = await Schedule.findOne({ user: req.user.id });

    if (schedule) {
      // Update
      schedule = await Schedule.findOneAndUpdate(
        { user: req.user.id },
        { times: times },
        { new: true }
      );

      return res.json(schedule);
    }

    // Create
    schedule = new Schedule({ times: times });
    await schedule.save();

    // Set user type to SCHEDULED
    await User.findByIdAndUpdate(req.user.id, {
      $set: { user_type: SCHEDULED }
    });

    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET api/schedule/user/:user_id
 * @desc    Get schedule by user ID
 * @access  Public
 */
router.get("/user/:user_id", async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!schedule) return res.status(400).json({ msg: "Profile not found" });

    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Schedule not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
