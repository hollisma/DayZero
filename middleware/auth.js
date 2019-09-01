const jwt = require("jsonwebtoken");
const config = require("config");

// Purpose: middleware function that makes sure the req has a valid token
module.exports = (req, res, next) => {
  // Get token from header
  // Token must be passed into header with key 'x-auth-token'
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    // return res.send({ msg: "No token, authorization denied" });
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
