const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  date: Date,
  product: String,
  brand: String,
  unit_price: Number,
  amount: Number,
  total_price: Number,
  store: String,
  address: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
