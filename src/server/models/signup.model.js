const mongoose = require("mongoose");


const signupSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model('Signup', signupSchema);
