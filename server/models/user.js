const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  username: String,
  email: String,
  kerb: String,
  contactMethod1: String,
  contactDetails1: String,
  contactMethod2: String,
  contactDetails2: String,
  location: String,
  ratings: Array,
});

module.exports = mongoose.model("user", UserSchema);
