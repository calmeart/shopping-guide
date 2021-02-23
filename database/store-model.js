const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  store: String,
  address: String
});

const Store = mongoose.model('Store', productSchema);

module.exports =Store;
