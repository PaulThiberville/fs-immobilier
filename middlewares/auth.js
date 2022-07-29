const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    const decodedToken = jwt.verify(token, tokenSecret);
    if (!decodedToken) return res.status(401).json({ error: "Invalid token" });
    const userId = decodedToken.userId;
    if (checkIfUserStilExist === false)
      return res.status(401).json({ error: "User not found" });
    req.auth = { userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const checkIfUserStilExist = async (_id) => {
  const user = await User.findOne({ _id });
  if (!user) return false;
  return true;
};
