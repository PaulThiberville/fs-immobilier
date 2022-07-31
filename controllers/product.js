const image = require("../models/image");
const Image = require("../models/image");
const Product = require("../models/product");

exports.create = async (req, res) => {
  try {
    const product = new Product({
      type: req.body.type,
      category: req.body.category,
      title: req.body.title,
      city: req.body.city,
      description: req.body.description,
      price: req.body.price,
      surface: req.body.surface,
      rooms: req.body.rooms,
      images: [],
    });
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.readAll = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.readOne = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).json({ error: "Product not found" });
    product.title = req.body.title;
    product.city = req.body.city;
    product.description = req.body.description;
    product.price = req.body.price;
    product.surface = req.body.surface;
    product.rooms = req.body.rooms;
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const images = await Image.find({ post: req.params.id });
    for (let i = 0; i < images.length; i++) {
      await Image.deleteOne({ _id: images[i]._id });
    }
    await Product.deleteOne({ _id: req.params.id });
    return res.status(200).json({ _id: req.params.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
