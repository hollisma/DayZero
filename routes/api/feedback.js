const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");
const Group = require("../../models/Group");
const MatchInfo = require("../../models/MatchInfo");
const Feedback = require("../../models/Feedback");
const { PROFILED, MET } = require("../../models/types");

/**
 * @route   POST api/feedback
 * @desc    Submit feedback
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  // Destructure properties from req
  const { receiver_id, emojis, binary } = req.body;

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
    feedbackFields.receiver = receiver_id;
    feedbackFields.group = group;
    feedbackFields.emojis = emojis;
    feedbackFields.binary = binary != null ? binary : null;

    const feedback = new Feedback(feedbackFields);
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route   PUT api/feedback/finish
 * @desc    Finish submitting feedback
 * @access  Private
 */
router.put("/finish", auth, async (req, res) => {
  try {
    // Set user.user_type to PROFILED and group to null
    let user = await User.findById(req.user.id);
    const newUserAttrs = { group: null, user_type: PROFILED };
    await User.findByIdAndUpdate(req.user.id, { $set: newUserAttrs });

    // Reset user matching info
    await MatchInfo.findOneAndUpdate(
      { user: req.user.id },
      { $set: { times: [], activities: [], active: false } }
    );

    user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
