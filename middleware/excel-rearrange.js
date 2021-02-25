
module.exports = (req, res, next) => {
  const length = req.body.date.length;
  const array = [];
  for (let i = 0; i < length; i++) {
    const tempRow = {
      date: req.body.date[i],
      product: req.body.product[i],
      brand: req.body.brand[i],
      unitPrice: req.body.unitPrice[i],
      amount: req.body.amount[i],
      totalPrice: req.body.totalPrice[i],
      store: req.body.store[i],
      address: req.body.address[i],
      userid: req.user._id
    }
    array.push(tempRow);
  }
  req.productObjects = array;
  next();
};
