const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
  value: { type: String, required: true },
});

module.exports = mongoose.model("Type", typeSchema);
