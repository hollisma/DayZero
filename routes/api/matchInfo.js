const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

// Models
const MatchInfo = require("../../models/MatchInfo");
const User = require("../../models/User");
const { SCHEDULED } = require("../../models/types");

/**
 * @route   GET api/matchInfo/me
 * @desc    Get current user's matching information
 * @access  Private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const matchInfo = await MatchInfo.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!matchInfo) {
      // return res
      //   .status(400)
      //   .json({ msg: "There is no matching information for this user" });
      return res.json({});
    }

    res.json(matchInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   POST api/matchInfo
 * @desc    Create or update user matchInfo
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  let { times, activities } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user.verified) {
      res
        .status(401)
        .send("Please verify your account before matching");
      return;
    }

    let matchInfo = await MatchInfo.findOne({ user: req.user.id });

    times = times || matchInfo.times
    activities = activities || matchInfo.activities

    if (matchInfo) {
      // Update
      matchInfo = await MatchInfo.findOneAndUpdate(
        { user: user },
        { times: times, activities: activities },
        { new: true }
      );
    } else {
      // Create
      matchInfo = new MatchInfo({ times: times, activities: activities, user: user });
      await matchInfo.save();
    }

    // Set user type to SCHEDULED
    await User.findByIdAndUpdate(req.user.id, {
      $set: { user_type: SCHEDULED }
    });

    res.json(matchInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   POST api/matchInfo/admin
 * @desc    Create or update user matchInfo
 * @access  Admin
 */
router.post("/admin", admin, async (req, res) => {
  let { times, activities, user } = req.body;

  try {
    let matchInfo = await MatchInfo.findOne({ user: user });

    times = times || matchInfo.times
    activities = activities || matchInfo.activities

    if (matchInfo) {
      // Update
      matchInfo = await MatchInfo.findOneAndUpdate(
        { user: user },
        { times: times, activities: activities },
        { new: true }
      );
    } else {
      // Create
      matchInfo = new MatchInfo({ times: times, activities: activities, user: user });
      await matchInfo.save();
    }

    // Set user type to SCHEDULED
    await User.findByIdAndUpdate(user, {
      $set: { user_type: SCHEDULED }
    });

    res.json(matchInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET api/matchInfo/user/:user_id
 * @desc    Get matchInfo by user ID
 * @access  Public
 */
router.get("/user/:user_id", async (req, res) => {
  try {
    const matchInfo = await MatchInfo.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!matchInfo) return res.status(400).json({ msg: "Schedule not found" });

    res.json(matchInfo);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Schedule not found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET api/matchInfo/admin
 * @desc    Get all matchInfos
 * @access  Admin
 * */
router.get("/admin", admin, async (req, res) => {
  try {
    let matchInfos = await MatchInfo.find();
    res.json(matchInfos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
