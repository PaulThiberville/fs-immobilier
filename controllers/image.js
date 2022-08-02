const Product = require("../models/product");
const Image = require("../models/image");

exports.add = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).json({ error: "Product not found" });

    for (let i = 0; i < req.body.length; i++) {
      const newImage = new Image({
        product: product._id,
        url: req.body[i].url,
        thumb_url: req.body[i].thumb_url,
        deleteUrl: req.body[i].delete_url,
      });
      await newImage.save();
      product.images = [...product.images, newImage._id];
    }
    await product.save();
    await product.populate({ path: "images" });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id });
    if (!image) return res.status(404).json({ error: "Image not found" });
    const product = await Product.findOne({ _id: image.product });
    product.images = [...product.images].filter((id) => {
      return id.toString() !== req.body[i];
    });
    await product.save();
    await image.delete();
    await product.populate({ path: "images" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
