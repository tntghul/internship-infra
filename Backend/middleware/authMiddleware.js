// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require('../models/user')

const protect = async(req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token received in middleware:", token);

      const secret = process.env.JWT_SECRET || "secretkey";
      const decoded = jwt.verify(token, secret);
      console.log("Decoded token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log("JWT Error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } else {
    console.log("No token found in headers");
    return res.status(401).json({
      success: false,
      message: "No token",
    });
  }
};

module.exports = protect;