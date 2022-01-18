const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  username: String,
  email: String,
  kerb: String,
  contact1: String,
  contact2: String,
  contactDetails: String,
  location: String
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
