const Product = require('../database/product-model');

module.exports = async (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
    return;
  };
  if (req.params.product) {
    const promise = await Product.find({product: req.params.product});
    const uniqueBrandArray = [];
    const uniqueStoreArray = [];
    promise.forEach(item => {
      if (uniqueBrandArray.indexOf(item.brand) < 0) {
        uniqueBrandArray.push(item.brand);
      };
      if (uniqueStoreArray.indexOf(item.store) < 0) {
        uniqueStoreArray.push(item.store);
      };
    });
    req.filterBoxArray = {uniqueBrandArray, uniqueStoreArray}
    next();
  } else {
    const promise = await Product.find({});
    const uniqueProductArray = [];
    const uniqueBrandArray = [];
    const uniqueStoreArray = [];
    promise.forEach(item => {
      if (uniqueProductArray.indexOf(item.product) < 0) {
        uniqueProductArray.push(item.product);
      };
      if (uniqueBrandArray.indexOf(item.brand) < 0) {
        uniqueBrandArray.push(item.brand);
      };
      if (uniqueStoreArray.indexOf(item.store) < 0) {
        uniqueStoreArray.push(item.store);
      };
    });
    req.filterBoxArray = {uniqueProductArray, uniqueBrandArray, uniqueStoreArray}
    next();
  }
};
