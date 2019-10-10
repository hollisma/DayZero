const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

// Models
const User = require("../../models/User");
const Group = require("../../models/Group");
const { SCHEDULED, GROUPED, MET } = require("../../models/types");

/**
 * @route   GET api/groups
 * @desc    Get a group
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if user is in group
    if (!user.group) {
      // return res.status(400).json({ msg: "User is not in a group" });
      return res.json({});
    }

    const group = await Group.findById(user.group);

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   POST api/groups
 * @desc    Make a group
 * @access  Admin
 */
router.post("/", admin, async (req, res) => {
  try {
    const user_ids = req.body.user_ids;
    for (let i = 0; i < user_ids.length; i++) {
      const user = await User.findById(user_ids[i]);

      // Check if user is in group
      if (user.group) {
        return res.status(400).json({ msg: "User is already in a group" });
      }
    }

    // Create group
    const group = new Group({ members: user_ids });
    await group.save();

    // Add group to user
    const newUserAttrs = { group: group._id, user_type: GROUPED };
    for (let i = 0; i < user_ids.length; i++) {
      await User.findByIdAndUpdate(user_ids[i], { $set: newUserAttrs });
    }

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
    var groupArr = group.members.map(m => m.toJSON());
    if (groupArr.includes(req.user.id)) {
      return res.status(400).json({ msg: "User is already in the group" });
    }
    const user = await User.findById(req.user.id);
    if (user.group) {
      return res.status(400).json({ msg: "User is already in a group" });
    }
    groupArr.push(req.user.id);

    // Update members of group
    // const newMembers = { members: groupArr };
    await Group.findByIdAndUpdate(req.params.group_id, {
      $set: { members: groupArr }
    });

    // Add group to user
    const newUserAttrs = { group: group._id, user_type: GROUPED };
    await User.findByIdAndUpdate(req.user.id, { $set: newUserAttrs });

    const resultGroup = await Group.findById(req.params.group_id);
    res.json(resultGroup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/groups/remove/:group_id
 * @desc    Remove current member from group
 * @access  Private
 */
router.put("/remove/:group_id", auth, async (req, res) => {
  try {
    // Get new array of members
    const group = await Group.findById(req.params.group_id);
    var groupArr = group.members.map(m => m.toJSON());
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
    const newUserAttrs = { group: null, user_type: SCHEDULED };
    await User.findByIdAndUpdate(req.user.id, { $set: newUserAttrs });

    const resultGroup = await Group.findById(req.params.group_id);
    res.json(resultGroup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/groups/admin/:group_id
 * @desc    Update group
 * @access  Admin
 */
router.put("/admin/:group_id", admin, async (req, res) => {
  // Destructure properties from req
  var { members, time, active } = req.body;

  try {
    var group = await Group.findById(req.params.group_id);

    if (!group.active) {
      return res.status(400).json({ msg: "Group already met" });
    }

    // Build group object
    const groupFields = {};
    // Add members nonsafely
    groupFields.members = group.members;
    members.forEach(member => {
      if (!groupFields.members.includes(member)) {
        groupFields.members.push(member);
      }
    });
    if (groupFields.members.length > 4) {
      return res.status(400).json({ msg: "Maximum group size is 4" });
    }
    // Add time & active
    groupFields.time = time ? time : group.time;
    groupFields.active = active != null ? active : group.active;

    // Update group
    group = await Group.findByIdAndUpdate(
      req.params.group_id,
      { $set: groupFields },
      { new: true }
    );

    // Add group to user
    await members.forEach(async member => {
      await User.findByIdAndUpdate(member, {
        group: req.params.group_id,
        user_type: GROUPED
      });
    });

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/groups/admin/archive/:group_id
 * @desc    Archive group
 * @access  Admin
 */
router.put("/admin/archive/:group_id", admin, async (req, res) => {
  try {
    // Change each member type to MET
    var group = await Group.findById(req.params.group_id);
    const members = group.members;
    members.forEach(async member => {
      await User.findByIdAndUpdate(member, {
        $set: { user_type: MET }
      });
    });

    await Group.findByIdAndUpdate(req.params.group_id, {
      $set: { active: false }
    });

    group = await Group.findById(req.params.group_id);

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET api/groups/admin
 * @desc    Get all groups
 * @access  Admin
 */
router.get("/admin", admin, async (req, res) => {
  try {
    var groups = await Group.find();
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
