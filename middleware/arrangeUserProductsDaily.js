const Product = require('../database/product-model');

module.exports = async (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
    return;
  };
  const promise = await Product.find({userid: req.user._id});
  const uniqueDateArray = [];
  promise.forEach(item => {
    if (uniqueDateArray.indexOf(new Date(item.date).toISOString().split('T')[0]) < 0) {
      uniqueDateArray.push(new Date(item.date).toISOString().split('T')[0]);
    };
  });
  uniqueDateArray.forEach((date, idx) => {
    const dateProducts = promise.filter(item => new Date(item.date).toISOString().split('T')[0] == date);
    const reducer = (acc, cur) => acc + cur.totalPrice;
    const dateTotal = dateProducts.reduce(reducer, 0);
    uniqueDateArray[idx] = {date, dateTotal, dateProducts}
  })
  req.userProductsDaily = uniqueDateArray;
  next();
};
