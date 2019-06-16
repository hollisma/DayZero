const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

/**
 * @route   GET api/auth
 * @desc    Test route; Use token to get user
 * @access  Public
 */
router.get('/', auth, async (req, res) => {
  try {
    // select(-x) returns object without property x
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
