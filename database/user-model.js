const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  account_type: String
});

const User = mongoose.model('User', productSchema);

module.exports = User;
