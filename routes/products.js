const express = require('express');
const router = express.Router();
const excelParse = require('../middleware/excel-parse');
const excelArrange = require('../middleware/excel-rearrange');
const filterBoxArrange = require('../middleware/arrangeFilterBox');
const Product = require('../database/product-model.js');
const Temp = require('../database/temp-model');

router.get('/', filterBoxArrange, (req, res) => {
  res.render('products', {
    foundProducts: req.foundProducts, filterBox: req.filterBoxArray
  });
});

router.get('/product/:productName',filterBoxArrange, (req, res) => {
  res.render('oneProduct', {
    foundProduct: req.foundProduct, filterBox: req.filterBoxArray
  });
});

router.get('/new', async (req, res) => {
  const draftProducts = await Temp.find({});
  res.render('newProduct', {
    draftProducts
  });
});

router.post('/excel', excelParse, (req, res) => {
  req.excelParsedData.forEach(async object => {
    const tempProduct = new Temp(object);
    await tempProduct.save();
  });
  res.redirect('/products/new');
});

router.post('/save', excelArrange, async (req, res) => {
  await Temp.deleteMany({});
  req.productObjects.forEach(async object => {
    const tempProduct = new Product(object);
    await tempProduct.save();
  });
  res.redirect('/products');
});

module.exports = router;
