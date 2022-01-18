const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  creator: String,
  name: String,
  description: String,
  type: String,
  time: String,
});

module.exports = mongoose.model("request", requestSchema);
// const Request = mongoose.model("request", requestSchema);

// const Battery = new Request({
//   creator: "Katie Liu",
//   name: "battery",
//   description: "two double A batteries",
//   type: "trade",
//   time: "1 day",
// });

// Battery.save().then((obj) => console.log("Added ${obj.name}"));