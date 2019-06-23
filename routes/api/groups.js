const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

// Models
const User = require("../../models/User");
const Group = require("../../models/Group");

/**
 * @route   POST api/groups
 * @desc    Make a group
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if user is in group
    if (user.group) {
      return res.status(400).json({ msg: "User is already in a group" });
    }

    // Create group with current user as a member
    const group = new Group({ members: [req.user.id] });
    await group.save();

    // Add group to user
    const newGroup = { group: group._id };
    await User.findByIdAndUpdate(req.user.id, { $set: newGroup });

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/groups/:group_id/:user_id
 * @desc    Update a group
 * @access  Private
 */
router.put("/", auth, async (req, res) => {
  // Destructure properties from req
  const { members, time, location, active } = req.body;

  // Build group object
  const groupFields = {};
  if (members) profileFields.members.push(members);

  try {
    const group = await Group.findOne({ id: req.params.group_id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
