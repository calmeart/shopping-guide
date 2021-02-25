const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  date: Date,
  product: String,
  brand: String,
  unitPrice: Number,
  amount: Number,
  totalPrice: Number,
  store: String,
  address: String,
  userid: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
