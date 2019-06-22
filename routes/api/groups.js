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

    // Add to group
    const group = new Group({ members: [req.user.id] });
    await group.save();
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

