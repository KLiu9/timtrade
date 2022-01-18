const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  obtain_options: String,
  // upload feature
});

module.exports = mongoose.model("item", itemSchema);
