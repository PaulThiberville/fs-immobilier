const Product = require("../models/product");
const Image = require("../models/image");

exports.add = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).json({ error: "Product not found" });

    for (let i = 0; i < req.body.length; i++) {
      const newImage = new Image({
        product: product._id,
        url: req.body[i].data.url,
        deleteUrl: req.body[i].data.delete_url,
      });
      await newImage.save();
      product.images = [...product.images, newImage._id];
    }
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      const image = await Image.findOne({ _id: req.body[i] });
      if (!image) return res.status(404).json({ error: "Image not found" });
      const product = await Product.findOne({ _id: image.product });
      product.images = [...product.images].filter((id) => {
        return id.toString() !== req.body[i];
      });
      await product.save();
      await image.delete();
    }
    return res.status(200).json({ deleted: req.body });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
