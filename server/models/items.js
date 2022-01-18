const mongoose = require("mongoose");

// collections: user, items

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  obtain_options: String,
  // upload feature
});

module.exports = mongoose.model("item", itemSchema);
// const Item = mongoose.model("inventory item", itemSchema);

// const Battery = new Item({
//   name: "batteries",
//   description: "two double A batteries",
//   obtain_options: "trade",
// });

// Battery.save().then((obj) => console.log("Added ${obj.name}"));
