const Product = require("../models/product");

exports.getCities = async (req, res) => {
  try {
    const products = await Product.distinct("city");
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
