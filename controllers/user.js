const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    await user.save();
    return res.status(201).json({
      id: user._id,
      token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      }),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (await bcrypt.compare(req.body.password, user.password)) {
      return res.status(200).json({
        id: user._id,
        token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "24h",
        }),
      });
    }
    return res.status(400).json({ error: "Invalid Password" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
