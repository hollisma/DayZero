const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

// Purpose: middleware function that makes sure the req has a valid token for admin user
module.exports = async (req, res, next) => {
  // Get token from header
  // Token must be passed into header with key 'x-auth-token'
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;

    const user = await User.findById(req.user.id);
    if (user.email != config.get("adminEmail")) {
      return res
        .status(401)
        .json({ msg: "No admin token, authorization denied" });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
