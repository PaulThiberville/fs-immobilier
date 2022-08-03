const Type = require("../models/type");

exports.add = async (req, res) => {
  try {
    const type = new Type({
      value: req.body.value,
    });
    await type.save();
    return res.status(201).json(type);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const categories = await Type.find({});
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Type.deleteOne({ _id: req.params.id });
    return res.status(200).json({ _id: req.params.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
