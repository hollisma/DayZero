const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Models
const Schedule = require("../../models/Schedule");
const User = require("../../models/User");
const { PROFILED } = require("../../models/types");

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
      return res.status(400).json({ msg: "There is no schedule for this user" });
    }

    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
