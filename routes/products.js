const express = require('express');
const router = express.Router();
const excelParse = require('../middleware/excel-parse');
const Product = require('../database/product-model.js');

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.post('/excel', excelParse, (req, res) => {
  req.excelParsedData.forEach(async object => {
    const tempProduct = new Product(object);
    await tempProduct.save();
  });
  res.redirect('/products');
})

module.exports = router;
