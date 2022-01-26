const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  creator: String,
  name: String,
  description: String,
  type: String,
  claimed: Array,
});

module.exports = mongoose.model("item", itemSchema);
