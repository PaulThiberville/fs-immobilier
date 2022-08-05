const Product = require("../models/product");

exports.getCities = async (req, res) => {
  try {
    const regex = new RegExp("^" + req.params.input, "i");
    const products = await Product.aggregate([
      { $unwind: "$city" },
      { $match: { city: regex } },
      {
        $group: {
          _id: null,
          cities: { $addToSet: "$city" },
        },
      },
    ]);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
