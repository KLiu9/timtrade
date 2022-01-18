const mongoose = require("mongoose");

// collections: user, items

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  obtain_options: String,
  // upload feature
});

module.exports = mongoose.model("item", itemSchema);