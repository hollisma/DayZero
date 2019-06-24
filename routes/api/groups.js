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
 * @route   PUT api/groups/add/:group_id
 * @desc    Add a group member
 * @access  Private
 */
router.put("/add/:group_id", auth, async (req, res) => {
  try {
    // Get new array of members
    const group = await Group.findById(req.params.group_id);
    var groupArr = group.members;
    if (groupArr.includes(req.user.id)) {
      return res.status(400).json({ msg: "User is already in a group" });
    }
    const user = await User.findById(req.user.id);
    if (user.group) {
      return res.status(400).json({ msg: "User is already in a group" });
    }
    groupArr.push(req.user.id);

    // Update members of group
    const newMembers = { members: groupArr };
    await Group.findOneAndUpdate(req.params.group_id, {
      $set: newMembers
    });

    // Add group to user
    const newGroup = { group: group._id };
    await User.findByIdAndUpdate(req.user.id, { $set: newGroup });

    const resultGroup = await Group.findById(req.params.group_id);
    res.json(resultGroup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/groups/remove/:group_id
 * @desc    Remove a group member
 * @access  Private
 */
router.put("/remove/:group_id", auth, async (req, res) => {
  try {
    // Get new array of members
    const group = await Group.findById(req.params.group_id);
    var groupArr = group.members;
    if (!groupArr.includes(req.user.id)) {
      return res.status(400).json({ msg: "User is not in the group" });
    }
    const user = await User.findById(req.user.id);
    if (user.group != req.params.group_id) {
      return res.status(400).json({ msg: "User is not in the group" });
    }
    groupArr = groupArr.filter(member => member != req.user.id);

    // Update members of group
    const newMembers = { members: groupArr };
    await Group.findOneAndUpdate(req.params.group_id, {
      $set: newMembers
    });

    // Remove group from user
    const newGroup = { group: null };
    await User.findByIdAndUpdate(req.user.id, { $set: newGroup });

    const resultGroup = await Group.findById(req.params.group_id);
    res.json(resultGroup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/groups/:group_id
 * @desc    Update group
 * @access  Private                     SHOULD BE ADMIN
 */
router.put("/:group_id", auth, async (req, res) => {
  // Destructure properties from req
  var { members, time, active } = req.body;

  try {
    var group = await Group.findById(req.params.group_id);

    // Build group object
    const groupFields = {};

    groupFields.members = members;
    if (group.members) {
      groupFields.members.push(...group.members);
    }
    if (members && groupFields.members.length > 4) {
      return res.status(400).json({ msg: "Maximum group size is 4" });
    }

    groupFields.time = time instanceof Date ? time : group.time;
    groupFields.active = typeof active == typeof true ? active : group.active;

    await Group.findByIdAndUpdate(req.params.group_id, {
      $set: groupFields
    });

    group = await Group.findById(req.params.group_id);

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
