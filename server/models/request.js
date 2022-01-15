const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: String,
  description: String,
  type_of_request: String,
  time_needed_by: String,
});

module.exports = mongoose.model("request", requestSchema);
