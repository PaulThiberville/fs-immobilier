const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  value: { type: String, required: true },
});

module.exports = mongoose.model("Category", categorySchema);
