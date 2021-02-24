const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
  date: Date,
  product: String,
  brand: String,
  unitPrice: Number,
  amount: Number,
  totalPrice: Number,
  store: String,
  address: String
});

const Temp = mongoose.model('Temp', tempSchema);

module.exports = Temp;
