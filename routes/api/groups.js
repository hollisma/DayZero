const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

// Models
const User = require("../../models/User");
const Group = require("../../models/Group");

/**
 * @route   PUT api/groups
 * @desc    Make a group
 * @access  Private
 */
router.put('/', auth, async (req, res) => {
  
  try {
    const user = await User.findOne({ id: req.user.id });
    
    // Check if user is in group
    if (user.group) {
      res.status(400).json({ msg: 'User is already in a group' });
    }

    // Create group
    const group = new Group({ members: [req.user.id] });
    await group.save();

    // Add user to group
    user.group = group._id;

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/groups/:group_id/:user_id
 * @desc    Update a group
 * @access  Private
 */
router.put('/', auth, async (req, res) => {
  // Destructure properties from req
  const {
    members, 
    time, 
    location, 
    active
  }

  // Build group object
  const groupFields = {};
  if (members) profileFields.members.push(members);
  
  try {
    const group = await Group.findOne({ id: req.params.group_id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

