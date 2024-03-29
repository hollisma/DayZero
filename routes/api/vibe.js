const express = require("express");
const router = express.Router();
const admin = require("../../middleware/admin");
const Vibe = require("../../models/Vibe");

/**
 * @route   POST api/vibe
 * @desc    Create vibe
 * @access  Admin
 */
router.post("/", admin, async (req, res) => {
  try {
    vibe = new Vibe({
      map: {}
    });

    await vibe.save();

    res.json(vibe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET api/vibe
 * @desc    Get vibe
 * @access  Admin
 */
router.get("/", admin, async (req, res) => {
  try {
    vibe = await Vibe.findOne();

    res.json(vibe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/vibe
 * @desc    Update vibe
 * @access  Admin
 */
router.put("/", admin, async (req, res) => {
  let { map } = req.body;

  try {
    console.log(map);
    vibe = await Vibe.findOne();
    // vibe.map = map;
    // vibe = await vibe.save();
    // vibe = await Vibe.findByIdAndUpdate(
    //   vibe._id,
    //   { $set: { map } },
    //   { new: true }
    // );
    console.log(vibe._id);
    vibe = await Vibe.findByIdAndUpdate(vibe._id, {
      $set: { map: map },
      upsert: true
    });

    res.json(vibe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
