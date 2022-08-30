const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  surface: { type: Number, required: true },
  rooms: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  images: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
  ],
  createdAt: { type: Number, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
