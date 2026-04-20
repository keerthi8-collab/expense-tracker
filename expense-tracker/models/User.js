const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  budget: { type: Number, default: 2000 }
});

module.exports = mongoose.model("User", userSchema);