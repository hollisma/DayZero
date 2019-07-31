const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Models
const Schedule = require("../../models/Schedule");
const User = require("../../models/User");
const { PROFILED } = require("../../models/types");

module.exports = router;
