const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  creator: String,
  name: String,
  description: String,
  type: String,
  time: String,
  fulfilled: Array,
});

module.exports = mongoose.model("request", requestSchema);
