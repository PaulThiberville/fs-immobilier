const image = require("../models/image");
const Image = require("../models/image");
const Product = require("../models/product");

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const productStatus = {
  PENDING: "pending",
  HIDDEN: "hidden",
  VISIBLE: "visible",
};

exports.create = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      email: req.body.email,
      type: req.body.type,
      category: req.body.category,
      title: req.body.title,
      city: capitalizeFirstLetter(req.body.city),
      description: req.body.description,
      price: req.body.price,
      surface: req.body.surface,
      rooms: req.body.rooms,
      bedrooms: req.body.bedrooms,
      images: req.body.images,
      createdAt: Date.now(),
      status: productStatus.PENDING,
    });
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const options = {};

    if (req.body?.id) options._id = req.body.id;
    if (req.body?.name) options.name = req.body.name;
    if (req.body?.email) options.email = req.body.email;
    if (req.body?.status) options.status = req.body.status;
    if (req.body?.category) options.category = req.body.category;
    if (req.body?.type) options.type = req.body.type;
    if (req.body?.city) options.city = capitalizeFirstLetter(req.body.city);
    if (req.body?.price) options.price = { $lte: req.body.price };
    if (req.body?.surface) options.surface = { $gte: req.body.surface };
    if (req.body?.rooms) options.rooms = { $gte: req.body.rooms };
    if (req.body?.bedrooms) options.bedrooms = { $gte: req.body.bedrooms };
    if (req.body?.createdAt) options.createdAt = { $lte: req.body.createdAt };

    const count = await Product.find(options).count();
    const products = await Product.find(options)
      .sort({ createdAt: 1 })
      .skip(req.body.offset)
      .limit(req.body.limit);
    for (let i = 0; i < products.length; i++) {
      await products[i].populate({ path: "images" });
    }
    return res.status(200).json({ products, count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.readOne = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).json({ error: "Product not found" });
    await product.populate({ path: "images" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (req.body.name) product.name = req.body.name;
    if (req.body.email) product.email = req.body.email;
    if (req.body.type) product.type = req.body.type;
    if (req.body.category) product.category = req.body.category;
    if (req.body.city) product.city = req.body.city;
    if (req.body.description) product.description = req.body.description;
    if (req.body.price) product.price = req.body.price;
    if (req.body.surface) product.surface = req.body.surface;
    if (req.body.rooms) product.rooms = req.body.rooms;
    if (req.body.bedrooms) product.bedrooms = req.body.bedrooms;
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const images = await Image.find({ product: req.params.id });
    for (let i = 0; i < images.length; i++) {
      await Image.deleteOne({ _id: images[i]._id });
    }
    await Product.deleteOne({ _id: req.params.id });
    return res.status(200).json({ _id: req.params.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
