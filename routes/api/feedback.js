const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");
const Group = require("../../models/Group");
const Feedback = require("../../models/Feedback");
const MET = require("../../models/types");

/**
 * @route   POST api/feedback
 * @desc    Submit feedback
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  // Destructure properties from req
  const { q1, q2, q3, q4, q5 } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user.group) {
      return res.status(400).json({ msg: "User is not in a group" });
    }
    if (user.user_type !== MET) {
      return res.status(400).json({ msg: "User has not met with a group yet" });
    }
    const group = await Group.findById(user.group);
    if (group.active) {
      return res.status(400).json({ msg: "User's group has not met yet" });
    }

    // Build feedback object
    const feedbackFields = {};
    feedbackFields.user = req.user.id;
    feedbackFields.group = user.group;
    feedbackFields.q1 = q1 ? q1 : null;
    feedbackFields.q2 = q2 ? q2 : null;
    feedbackFields.q3 = q3 ? q3 : null;
    feedbackFields.q4 = q4 ? q4 : null;
    feedbackFields.q5 = q5 ? q5 : null;

    const feedback = new Feedback(feedbackFields);
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
