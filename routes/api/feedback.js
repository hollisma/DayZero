const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Models
const Feedback = require("../../models/Feedback");

/**
 * @route   POST api/feedback
 * @desc    Submit feedback
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  // Destructure properties from req
  const { feedback } = req.body;

  try {
    const fb = new Feedback({ feedback });
    await fb.save();
    res.json(fb);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
