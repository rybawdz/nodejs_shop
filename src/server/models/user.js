const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
  profileImage: String,
});

module.exports = mongoose.model('User', userSchema);
