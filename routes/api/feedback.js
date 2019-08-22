const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");
const Group = require("../../models/Group");
const Feedback = require("../../models/Feedback");
const { MET } = require("../../models/types");

/**
 * @route   POST api/feedback
 * @desc    Submit feedback
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  // Destructure properties from req
  const { receiver_id, rating, binary } = req.body;

  try {
    // TODO: handle if feedback between two users in a group already exists

    const user = await User.findById(req.user.id);
    if (!user.group) {
      return res.status(400).json({ msg: "User is not in a group" });
    }
    if (user.user_type !== MET) {
      return res.status(400).json({ msg: "User has not met with a group yet" });
    }

    const receiver = await User.findById(receiver_id);
    if (!receiver.group) {
      return res.status(400).json({ msg: "Receiver is not in a group" });
    }
    if (receiver.user_type !== MET) {
      return res
        .status(400)
        .json({ msg: "Receiver has not met with a group yet" });
    }

    const group = await Group.findById(user.group);
    if (group.active) {
      return res.status(400).json({ msg: "User's group has not met yet" });
    }

    // Build feedback object
    const feedbackFields = {};
    feedbackFields.user = req.user.id;
    feedbackFields.receiver = receiver;
    feedbackFields.group = group;
    feedbackFields.rating = rating ? rating : null;
    feedbackFields.binary = binary ? binary : null;

    const feedback = new Feedback(feedbackFields);
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
