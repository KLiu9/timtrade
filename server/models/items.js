const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  creator: String,
  name: String,
  description: String,
  type: String,
  // upload feature
});

module.exports = mongoose.model("item", itemSchema);
