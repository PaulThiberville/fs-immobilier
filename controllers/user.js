const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Product = require("../models/product");

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
      token: jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      }),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id email");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("_id email");
    return res.status(200).json(user);
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
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });
    }
    return res.status(400).json({ error: "Invalid Password" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.body.email) user.email = req.body.email;
    if (req.body.password)
      user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();

    return res.status(200).json("Succesfully updated user");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await Product.deleteMany({ user: req.params.id });
    await User.deleteOne({ _id: req.params.id });
    return res.status(200).json("Succesfully deleted user");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
